import {
  GlobalVariableDeclaration,
  ParsedDocument,
  RoutineExpression,
  RoutineDeclaration,
  SourceRange,
  TypeDeclaration,
  TypeField,
  parseTypeDeclarations
} from './typeParser';

interface Edit {
  range: SourceRange;
  text: string;
}

interface Statement {
  range: SourceRange;
  delimiter?: '.' | ';';
  comment?: boolean;
}

interface WordToken {
  text: string;
  start: number;
  end: number;
}

interface StatementSyntax {
  breaks: number[];
  returning?: number;
}

const wrappedExpressionOperators = new Set(['mais', 'menos', 'vezes', 'junto com']);

export function formatDocument(
  source: string,
  parsedDocument?: ParsedDocument
): string {
  const parsed = parsedDocument ?? parseTypeDeclarations(source);
  const masked = maskProtectedText(source);
  const eol = source.includes('\r\n') ? '\r\n' : '\n';
  const edits: Edit[] = [];

  for (const declaration of parsed.declarations) {
    if (declaration.fields?.length) {
      edits.push({
        range: declaration.range,
        text: formatFieldsDeclaration(
          source,
          declaration,
          declaration.fields,
          eol
        )
      });
    }
  }
  for (const declaration of parsed.globalVariables) {
    if (declaration.fields?.length) {
      edits.push({
        range: declaration.range,
        text: formatFieldsDeclaration(
          source,
          declaration,
          declaration.fields,
          eol
        )
      });
    }
  }
  for (const routine of parsed.routines) {
    edits.push({
      range: routine.bodyRange,
      text: formatRoutineBody(source, masked, routine, eol)
    });
  }
  const topLevelBlocks = [
    ...parsed.declarations
      .filter(declaration => declaration.fields?.length)
      .map(declaration => ({
        start: declaration.range.start,
        end: declaration.range.end,
        kind: 'fields' as const
      })),
    ...parsed.globalVariables
      .filter(declaration => declaration.fields?.length)
      .map(declaration => ({
        start: declaration.range.start,
        end: declaration.range.end,
        kind: 'fields' as const
      })),
    ...parsed.routines.map(routine => ({
      start: routine.range.start,
      kind: 'routine' as const
    }))
  ].sort((first, second) => first.start - second.start);
  for (let index = 0; index < topLevelBlocks.length - 1; index++) {
    const block = topLevelBlocks[index];
    const nextBlock = topLevelBlocks[index + 1];
    if (block.kind !== 'fields' || nextBlock.start < block.end) {
      continue;
    }
    const gap = source.slice(block.end, nextBlock.start);
    if (/^\s*$/u.test(gap)) {
      edits.push({
        range: { start: block.end, end: nextBlock.start },
        text: `${eol}${eol}`
      });
    }
  }

  let formatted = source;
  for (const edit of edits.sort((first, second) => second.range.start - first.range.start)) {
    formatted = formatted.slice(0, edit.range.start) +
      edit.text +
      formatted.slice(edit.range.end);
  }

  return normalizeIndentationOutsideLiterals(formatted);
}

function formatFieldsDeclaration(
  source: string,
  declaration: TypeDeclaration | GlobalVariableDeclaration,
  fields: TypeField[],
  eol: string
): string {
  const firstFieldStart = fields[0].range.start;
  const header = source.slice(declaration.range.start, firstFieldStart).trimEnd();
  const lines = [header];
  for (let index = 0; index < fields.length; index++) {
    const field = fields[index];
    const next = fields[index + 1];
    const content = source.slice(field.range.start, field.range.end).trim();
    const separator = next
      ? findFieldSeparatorText(source.slice(field.range.end, next.range.start))
      : '';
    lines.push(`  ${content}${separator}`);
  }
  lines[lines.length - 1] += '.';
  return lines.join(eol);
}

function findFieldSeparatorText(gap: string): string {
  const masked = maskProtectedText(gap);
  const comma = masked.indexOf(',');
  let separator = '';
  let separatorStart = -1;
  let separatorEnd = -1;
  if (comma !== -1) {
    separator = ',';
    separatorStart = comma;
    separatorEnd = comma + 1;
  } else {
    const conjunction = /\b(e|ou)\b/iu.exec(masked);
    if (conjunction) {
      separator = ` ${conjunction[1].toLocaleLowerCase('pt-BR')}`;
      separatorStart = conjunction.index;
      separatorEnd = conjunction.index + conjunction[0].length;
    }
  }
  const remainder = separatorStart === -1
    ? gap.trim()
    : `${gap.slice(0, separatorStart)}${gap.slice(separatorEnd)}`.trim();
  return separator + (remainder ? ` ${remainder}` : '');
}

function formatRoutineBody(
  source: string,
  masked: string,
  routine: RoutineDeclaration,
  eol: string
): string {
  const range = routine.bodyRange;
  const statements: string[] = [];
  let cursor = range.start;
  let hasSeenStatement = false;
  const hasImplicitLoop = routine.loopBlocks.some(loop =>
    loop.kind === 'implicit'
  );
  let loopDepth = hasImplicitLoop ? 2 : 1;
  const endedWithNewline = source.slice(range.start, range.end).endsWith('\n') ||
    source.slice(range.start, range.end).endsWith('\r');

  while (cursor < range.end) {
    cursor = skipWhitespace(source, cursor, range.end);
    if (cursor >= range.end) {
      break;
    }
    const leadingComment = readComment(source, masked, cursor, range.end);
    if (leadingComment) {
      const commentIndent = hasImplicitLoop && !hasSeenStatement
        ? loopDepth - 1
        : loopDepth;
      statements.push(
        ...leadingComment.text.split(/\r?\n/u).map(line => `${spaces(commentIndent)}${line}`)
      );
      cursor = leadingComment.end;
      continue;
    }
    const conditional = routine.conditionals.find(block =>
      block.range.start >= cursor &&
      block.range.start === skipWhitespace(source, cursor, range.end)
    );
    if (conditional && conditional.range.end <= range.end) {
      const comma = findConditionalComma(masked, conditional.range);
      if (comma !== undefined) {
        const baseIndent = Math.max(0, loopDepth);
        const conditionText = source.slice(conditional.range.start, comma).trim();
        statements.push(`${spaces(baseIndent)}${conditionText},`);
        hasSeenStatement = true;
        const bodyRange = {
          start: comma + 1,
          end: conditional.range.end - 1
        };
        const children = splitStatements(source, masked, bodyRange);
        for (let index = 0; index < children.length; index++) {
          const child = children[index];
          if (child.comment) {
            const commentText = source.slice(child.range.start, child.range.end).trim();
            statements.push(
              ...commentText.split(/\r?\n/u).map(line => `${spaces(baseIndent + 1)}${replaceIndentTabs(line)}`)
            );
            continue;
          }
          let raw = source.slice(child.range.start, child.range.end);
          if (index === children.length - 1 && child.delimiter === '.') {
            raw = `${raw.trimEnd()}.`;
          }
          const text = raw.trim();
          const firstWord = firstWordToken(masked, child.range);
          const childIndent = baseIndent + 1;
          const formattedStatement = formatStatement(
            raw,
            text,
            childIndent,
            child.range.start,
            getStatementSyntax(routine, child.range, masked)
          );
          if (formattedStatement.length > 0) {
            formattedStatement[0] = capitalizeStatementStart(formattedStatement[0]);
          }
          statements.push(...formattedStatement);
          if (firstWord === 'itere') {
            loopDepth++;
          }
        }
        const trailingComment = readTrailingComment(
          source,
          masked,
          conditional.range.end,
          range.end
        );
        if (trailingComment && statements.length > 0) {
          statements[statements.length - 1] += ` ${trailingComment.text}`;
          cursor = trailingComment.end;
        } else {
          cursor = conditional.range.end;
        }
        continue;
      }
    }

    const statement = nextStatement(masked, cursor, range.end);
    if (!statement) {
      const remainder = source.slice(cursor, range.end).trim();
      if (remainder) {
        statements.push(`${spaces(loopDepth)}${remainder}`);
        hasSeenStatement = true;
      }
      break;
    }
    const firstWord = firstWordToken(masked, statement.range);
    let indent = loopDepth;
    if (firstWord === 'reitere') {
      loopDepth = Math.max(0, loopDepth - 1);
      indent = loopDepth;
    }
    const raw = source.slice(statement.range.start, statement.range.end);
    const formattedStatement = formatStatement(
      raw,
      raw.trim(),
      indent,
      statement.range.start,
      getStatementSyntax(routine, statement.range, masked)
    );
    const trailingComment = readTrailingComment(source, masked, statement.range.end, range.end);
    if (trailingComment) {
      formattedStatement[formattedStatement.length - 1] += ` ${trailingComment.text}`;
    }
    statements.push(...formattedStatement);
    hasSeenStatement = true;
    if (firstWord === 'itere') {
      loopDepth++;
    }
    cursor = trailingComment?.end ?? statement.range.end;
  }

  if (statements.length === 0) {
    if (range.end < source.length) {
      return eol + eol;
    }
    return endedWithNewline ? eol : '';
  }
  const result = eol + statements.join(eol);
  if (range.end < source.length) {
    return result + eol + eol;
  }
  return endedWithNewline ? result + eol : result;
}

function splitStatements(
  source: string,
  masked: string,
  range: SourceRange
): Statement[] {
  const statements: Statement[] = [];
  let start = skipWhitespace(source, range.start, range.end);
  while (start < range.end) {
    const comment = readComment(source, masked, start, range.end);
    if (comment) {
      statements.push({
        range: { start, end: comment.end },
        comment: true
      });
      start = skipWhitespace(source, comment.end, range.end);
      continue;
    }

    const statement = nextStatement(masked, start, range.end);
    if (!statement) {
      const finalRange = trimRange(source, start, range.end);
      if (finalRange.start < finalRange.end) {
        statements.push({ range: finalRange, delimiter: '.' });
      }
      break;
    }
    const trailingComment = readTrailingComment(
      source,
      masked,
      statement.range.end,
      range.end
    );
    if (trailingComment) {
      statements.push({
        range: { start: statement.range.start, end: trailingComment.end },
        delimiter: statement.delimiter
      });
      start = skipWhitespace(source, trailingComment.end, range.end);
    } else {
      statements.push(statement);
      start = skipWhitespace(source, statement.range.end, range.end);
    }
  }
  return statements;
}

function nextStatement(
  source: string,
  start: number,
  end: number
): Statement | undefined {
  let parenthesisDepth = 0;
  for (let index = start; index < end; index++) {
    if (source[index] === '(') {
      parenthesisDepth++;
    } else if (source[index] === ')' && parenthesisDepth > 0) {
      parenthesisDepth--;
    } else if (
      parenthesisDepth === 0 &&
      (source[index] === '.' || source[index] === ';')
    ) {
      return {
        range: { start, end: index + 1 },
        delimiter: source[index] as '.' | ';'
      };
    }
  }
  return undefined;
}

function findConditionalComma(
  source: string,
  range: SourceRange
): number | undefined {
  let parenthesisDepth = 0;
  for (let index = range.start; index < range.end; index++) {
    if (source[index] === '(') {
      parenthesisDepth++;
    } else if (source[index] === ')' && parenthesisDepth > 0) {
      parenthesisDepth--;
    } else if (source[index] === ',' && parenthesisDepth === 0) {
      return index;
    }
  }
  return undefined;
}

function readTrailingComment(
  source: string,
  masked: string,
  start: number,
  end: number
): { text: string; end: number } | undefined {
  let index = start;
  while (index < end && (source[index] === ' ' || source[index] === '\t')) {
    index++;
  }
  if (source[index] === '\\') {
    let commentEnd = index;
    while (commentEnd < end && source[commentEnd] !== '\n' && source[commentEnd] !== '\r') {
      commentEnd++;
    }
    return { text: source.slice(index, commentEnd), end: commentEnd };
  }
  if (source[index] !== '[' || masked[index] !== ' ') {
    return undefined;
  }
  const close = source.indexOf(']', index + 1);
  if (close === -1 || close >= end) {
    return undefined;
  }
  let commentEnd = close + 1;
  while (commentEnd < end && (source[commentEnd] === ' ' || source[commentEnd] === '\t')) {
    commentEnd++;
  }
  return {
    text: source.slice(index, close + 1),
    end: commentEnd
  };
}

function readComment(
  source: string,
  masked: string,
  start: number,
  end: number
): { text: string; end: number } | undefined {
  if (source[start] === '\\' && masked[start] === ' ') {
    let commentEnd = start;
    while (commentEnd < end && source[commentEnd] !== '\n' && source[commentEnd] !== '\r') {
      commentEnd++;
    }
    return { text: source.slice(start, commentEnd), end: commentEnd };
  }
  if (source[start] !== '[' || masked[start] !== ' ') {
    return undefined;
  }
  const close = source.indexOf(']', start + 1);
  if (close === -1 || close >= end) {
    return undefined;
  }
  return { text: source.slice(start, close + 1), end: close + 1 };
}

function formatStatement(
  raw: string,
  trimmed: string,
  indent: number,
  sourceOffset: number,
  syntax: StatementSyntax
): string[] {
  if (!trimmed) {
    return [];
  }
  const leadingWhitespace = raw.length - raw.trimStart().length;
  const textOffset = sourceOffset + leadingWhitespace;
  const tokens = wordTokens(maskProtectedText(trimmed));
  if (tokens[0]?.text === 'processe') {
    const returningToken = tokens.find(token => token.text === 'retornando');
    if (returningToken && syntax.returning === undefined) {
      syntax.returning = textOffset + returningToken.start;
    }
  }
  if (syntax.returning !== undefined) {
    const returningStart = syntax.returning - textOffset;
    const returningEnd = returningStart + 'retornando'.length;
    const before = trimmed.slice(0, returningStart).trim();
    const after = trimmed.slice(returningEnd).trim();
    const lines = before
      ? wrapExpression(
        before,
        indent,
        syntax.breaks.filter(offset => offset < syntax.returning!),
        textOffset
      )
      : [];
    lines.push(`${spaces(indent)}Retornando`);
    if (after) {
      lines.push(...wrapExpression(
        after,
        indent + 1,
        syntax.breaks.filter(offset => offset > syntax.returning!),
        textOffset + returningEnd + (trimmed.slice(returningEnd).length -
          trimmed.slice(returningEnd).trimStart().length)
      ));
    }
    return moveLeadingConjunctions(lines);
  }
  if (containsComment(raw)) {
    const lines = [spaces(indent) + replaceIndentTabs(trimmed)];
    return moveLeadingConjunctions(lines);
  }
  const lines = wrapExpression(trimmed, indent, syntax.breaks, textOffset);
  return moveLeadingConjunctions(lines);
}

function moveLeadingConjunctions(lines: string[]): string[] {
  const result: string[] = [];
  for (const line of lines.flatMap(value => value.split(/\r?\n/u))) {
    const conjunction = /^(\s*)e(?=\s|$)/iu.exec(line);
    if (!conjunction) {
      result.push(line);
      continue;
    }

    let previousIndex = result.length - 1;
    while (previousIndex >= 0 && !result[previousIndex].trim()) {
      previousIndex--;
    }
    if (
      previousIndex < 0 ||
      /^[\s\\[]/u.test(result[previousIndex].trimStart())
    ) {
      result.push(line);
      continue;
    }

    const previousLine = result[previousIndex];
    const lineCommentStart = findLineCommentStart(previousLine);
    const previousCode = (lineCommentStart === -1
      ? previousLine
      : previousLine.slice(0, lineCommentStart)
    ).trimEnd();
    const lineComment = lineCommentStart === -1
      ? ''
      : ` ${previousLine.slice(lineCommentStart).trimStart()}`;
    result[previousIndex] = `${previousCode} e${lineComment}`;
    const argument = line.slice(conjunction[0].length).trimStart();
    if (argument) {
      result.push(`${conjunction[1]}${argument}`);
    }
  }
  return result;
}

function findLineCommentStart(line: string): number {
  let inString = false;
  for (let index = 0; index < line.length; index++) {
    const character = line[index];
    if (inString) {
      if (character === '"' && line[index + 1] === '"') {
        index++;
      } else if (character === '"') {
        inString = false;
      }
      continue;
    }
    if (character === '"') {
      inString = true;
    } else if (character === '[') {
      const commentEnd = line.indexOf(']', index + 1);
      if (commentEnd === -1) {
        return -1;
      }
      index = commentEnd;
    } else if (character === '\\') {
      return index;
    }
  }
  return -1;
}

function wrapExpression(
  text: string,
  indent: number,
  absoluteBreaks: number[],
  sourceOffset: number
): string[] {
  const breaks = [...new Set(absoluteBreaks)]
    .map(offset => offset - sourceOffset)
    .filter(offset => offset > 0 && offset < text.length)
    .sort((first, second) => first - second);
  const lines: string[] = [];
  let start = 0;
  for (const breakAt of breaks) {
    const segment = text.slice(start, breakAt).trim();
    if (segment) {
      lines.push(`${spaces(start === 0 ? indent : indent + 1)}${segment}`);
    }
    start = breakAt;
  }
  const finalSegment = text.slice(start).trim();
  if (finalSegment) {
    lines.push(`${spaces(start === 0 ? indent : indent + 1)}${finalSegment}`);
  }
  return lines.length ? lines : [`${spaces(indent)}${replaceIndentTabs(text)}`];
}

function capitalizeStatementStart(line: string): string {
  const token = wordTokens(maskProtectedText(line))[0];
  if (!token || token.text === 'e' || token.text === 'ou') {
    return line;
  }
  const character = Array.from(line.slice(token.start))[0];
  return line.slice(0, token.start) +
    character.toLocaleUpperCase('pt-BR') +
    line.slice(token.start + character.length);
}

function firstWordToken(source: string, range: SourceRange): string | undefined {
  return wordTokens(source.slice(range.start, range.end))[0]?.text;
}

function getStatementSyntax(
  routine: RoutineDeclaration,
  statement: SourceRange,
  masked: string
): StatementSyntax {
  const breaks: number[] = [];
  let returning: number | undefined;
  for (const assignment of routine.assignments) {
    if (containsRange(statement, assignment.range)) {
      collectExpressionBreaks(assignment.expression, masked, breaks);
    }
  }
  for (const output of routine.outputs) {
    if (containsRange(statement, output.range)) {
      collectExpressionBreaks(output.expression, masked, breaks);
    }
  }
  for (const call of routine.calls) {
    if (isWithin(call.name.range.start, statement)) {
      addArgumentBreaks(call.arguments, masked, breaks);
    }
  }
  for (const process of routine.processes) {
    if (!containsRange(statement, process.range)) {
      continue;
    }
    addArgumentBreaks(process.arguments, masked, breaks);
    if (process.returnVariable) {
      returning = wordTokens(masked.slice(process.range.start, process.range.end))
        .find(token => token.text === 'retornando')
        ?.start;
      if (returning !== undefined) {
        returning += process.range.start;
      }
    }
  }
  return { breaks, returning };
}

function collectExpressionBreaks(
  expression: RoutineExpression,
  masked: string,
  breaks: number[]
): void {
  if (expression.kind !== 'binary') {
    if (expression.kind === 'unary') {
      collectExpressionBreaks(expression.operand, masked, breaks);
    }
    return;
  }
  const operatorStart = wrappedExpressionOperators.has(expression.operator)
    ? findOperator(
      masked,
      expression.left.range.end,
      expression.right.range.start,
      expression.operator
    )
    : undefined;
  if (operatorStart !== undefined) {
    breaks.push(expression.right.range.start);
  }
  collectExpressionBreaks(expression.left, masked, breaks);
  collectExpressionBreaks(expression.right, masked, breaks);
}

function findOperator(
  source: string,
  start: number,
  end: number,
  operator: string
): number | undefined {
  if (operator === '/') {
    const index = source.indexOf('/', start);
    return index !== -1 && index < end ? index : undefined;
  }
  const expected = operator.split(/\s+/u);
  const tokens = wordTokens(source.slice(start, end));
  for (let index = 0; index <= tokens.length - expected.length; index++) {
    if (expected.every((word, wordIndex) =>
      tokens[index + wordIndex].text === word
    )) {
      return start + tokens[index].start;
    }
  }
  return undefined;
}

function addArgumentBreaks(
  argumentsList: { range: SourceRange }[],
  masked: string,
  breaks: number[]
): void {
  if (argumentsList.length > 1) {
    breaks.push(argumentsList[0].range.start);
  }
  for (let index = 0; index < argumentsList.length - 1; index++) {
    const first = argumentsList[index];
    const next = argumentsList[index + 1];
    const gapTokens = wordTokens(masked.slice(first.range.end, next.range.start));
    if (gapTokens.some(token => token.text === 'e')) {
      breaks.push(next.range.start);
    }
  }
}

function containsRange(outer: SourceRange, inner: SourceRange): boolean {
  return inner.start >= outer.start && inner.end <= outer.end;
}

function isWithin(offset: number, range: SourceRange): boolean {
  return offset >= range.start && offset <= range.end;
}

function wordTokens(source: string): WordToken[] {
  const tokens: WordToken[] = [];
  const pattern = /\p{L}+/gu;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source))) {
    tokens.push({
      text: match[0].toLocaleLowerCase('pt-BR'),
      start: match.index,
      end: match.index + match[0].length
    });
  }
  return tokens;
}

function maskProtectedText(source: string): string {
  const characters = source.split('');
  let inString = false;
  let inBlockComment = false;
  for (let index = 0; index < characters.length; index++) {
    const character = source[index];
    const next = source[index + 1];
    if (inBlockComment) {
      if (character === ']') {
        characters[index] = ' ';
        inBlockComment = false;
      } else if (character !== '\n' && character !== '\r') {
        characters[index] = ' ';
      }
      continue;
    }
    if (inString) {
      if (character === '"' && next === '"') {
        characters[index + 1] = ' ';
        index++;
      } else {
        if (character === '"') {
          inString = false;
        }
        if (character !== '\n' && character !== '\r') {
          characters[index] = ' ';
        }
      }
      continue;
    }
    if (character === '"') {
      inString = true;
      characters[index] = ' ';
    } else if (character === '[') {
      inBlockComment = true;
      characters[index] = ' ';
    } else if (character === '\\') {
      characters[index] = ' ';
      while (index + 1 < source.length && source[index + 1] !== '\n' &&
        source[index + 1] !== '\r') {
        characters[++index] = ' ';
      }
    }
  }
  return characters.join('');
}

function normalizeIndentationOutsideLiterals(source: string): string {
  const masked = maskProtectedText(source);
  const characters = source.split('');
  for (let index = 0; index < characters.length; index++) {
    if (masked[index] === '\t') {
      characters[index] = ' ';
    }
  }
  return characters.join('');
}

function containsComment(source: string): boolean {
  let inString = false;
  for (let index = 0; index < source.length; index++) {
    if (source[index] === '"' && inString && source[index + 1] === '"') {
      index++;
    } else if (source[index] === '"') {
      inString = !inString;
    } else if (!inString && (source[index] === '[' || source[index] === '\\')) {
      return true;
    }
  }
  return false;
}

function replaceIndentTabs(text: string): string {
  return text.replace(/\t/gu, ' ');
}

function skipWhitespace(source: string, start: number, end: number): number {
  while (start < end && /\s/u.test(source[start])) {
    start++;
  }
  return start;
}

function trimRange(source: string, start: number, end: number): SourceRange {
  while (start < end && /\s/u.test(source[start])) {
    start++;
  }
  while (end > start && /\s/u.test(source[end - 1])) {
    end--;
  }
  return { start, end };
}

function spaces(level: number): string {
  return ' '.repeat(Math.max(0, level) * 2);
}
