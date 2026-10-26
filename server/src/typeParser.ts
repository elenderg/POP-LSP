import pluralize from './plural';

export interface SourceRange {
	start: number;
	end: number;
}

export interface TypeReference {
	name: string;
	normalizedName: string;
	range: SourceRange;
}

export interface NamedTypeField {
	kind: 'named';
	type: TypeReference;
	name: TypeReference;
	unionTarget?: TypeReference;
	usesTypeAlias: boolean;
	isReference: boolean;
}

export interface ByteArrayField {
	kind: 'byte-array';
	count: string;
	elementType: TypeReference;
	range: SourceRange;
}

export type TypeField = NamedTypeField | ByteArrayField;

export interface ParserDiagnostic {
	message: string;
	range: SourceRange;
}

export interface TypeDeclaration {
	kind: 'type-declaration';
	name: TypeReference;
	baseType: TypeReference;
	pointedType?: TypeReference;
	fields?: TypeField[];
	scalarFactor?: string;
	operator: 'é' | 'são';
	range: SourceRange;
}

export interface GlobalVariableDeclaration {
	kind: 'global-variable-declaration';
	name: TypeReference;
	type?: TypeReference;
	inferredTypeName?: string;
	initializer?: GlobalVariableLiteral;
	fields?: TypeField[];
	article: string;
	operator: 'é' | 'são';
	range: SourceRange;
}

export interface GlobalVariableLiteral {
	kind: 'integer' | 'fraction' | 'mixed' | 'hexadecimal' | 'string';
	text: string;
	range: SourceRange;
}

export interface RoutineParameter {
	name: TypeReference;
	type: TypeReference;
}

export interface RoutineDeclaration {
	name: TypeReference;
	alternateNames: TypeReference[];
	parameters: RoutineParameter[];
	returnParameter?: RoutineParameter;
	annotation?: 'rotina' | 'função';
	isBooleanFunction: boolean;
	range: SourceRange;
	bodyRange: SourceRange;
}

export class RoutineSymbolTable {
	private readonly routines = new Map<string, RoutineDeclaration>();

	constructor(declarations: RoutineDeclaration[] = []) {
		for (const declaration of declarations) {
			this.routines.set(declaration.name.normalizedName, declaration);
			for (const alternateName of declaration.alternateNames) {
				this.routines.set(alternateName.normalizedName, declaration);
			}
		}
	}

	lookup(name: string): RoutineDeclaration | undefined {
		return this.routines.get(normalizeTypeName(name));
	}

	get entries(): RoutineDeclaration[] {
		return [...new Set(this.routines.values())];
	}
}

export interface GlobalVariableSymbol {
	name: string;
	normalizedName: string;
	typeName?: string;
	type?: TypeReference;
	declaration: GlobalVariableDeclaration;
}

export class GlobalVariableSymbolTable {
	private readonly symbols = new Map<string, GlobalVariableSymbol>();

	constructor(declarations: GlobalVariableDeclaration[] = []) {
		for (const declaration of declarations) {
			const key = declaration.name.normalizedName;
			if (!this.symbols.has(key)) {
				this.symbols.set(key, {
					name: declaration.name.name,
					normalizedName: key,
					typeName: declaration.type?.name ?? declaration.inferredTypeName,
					type: declaration.type,
					declaration
				});
			}
		}
	}

	lookup(name: string): GlobalVariableSymbol | undefined {
		return this.symbols.get(normalizeTypeName(name));
	}

	get entries(): GlobalVariableSymbol[] {
		return [...this.symbols.values()];
	}
}

export interface TypeSymbol {
	name: string;
	normalizedName: string;
	pluralName: string;
	kind: 'primitive' | 'derived' | 'scalar';
	isScalar: boolean;
	scale: string;
	baseType?: TypeReference;
	pointedType?: TypeReference;
	fields?: TypeField[];
	scalarFactor?: string;
	declaration?: TypeDeclaration;
}

export class TypeSymbolTable {
	private readonly symbols = new Map<string, TypeSymbol>();
	private readonly names = new Map<string, TypeSymbol>();

	constructor(declarations: TypeDeclaration[] = []) {
		this.addPrimitive('byte', false);
		this.addPrimitive('estrutura', false);

		for (const declaration of declarations) {
			const key = declaration.name.normalizedName;
			if (!this.symbols.has(key)) {
				const symbol: TypeSymbol = {
					name: declaration.name.name,
					normalizedName: key,
					pluralName: pluralizeTypeName(declaration.name.name),
					kind: 'derived',
					isScalar: false,
					scale: '0/1',
					baseType: declaration.baseType,
					pointedType: declaration.pointedType,
					fields: declaration.fields,
					scalarFactor: declaration.scalarFactor,
					declaration
				};
				this.symbols.set(key, symbol);
			}
		}

		for (const symbol of this.symbols.values()) {
			this.names.set(symbol.normalizedName, symbol);
		}
		for (const symbol of this.symbols.values()) {
			this.addName(symbol.pluralName, symbol);
		}

		for (const symbol of this.symbols.values()) {
			this.resolveScale(symbol, new Set());
		}
	}

	lookup(name: string): TypeSymbol | undefined {
		return this.names.get(normalizeTypeName(name));
	}

	get entries(): TypeSymbol[] {
		return [...new Set(this.symbols.values())];
	}

	private addPrimitive(name: string, isScalar: boolean): void {
		const symbol: TypeSymbol = {
			name,
			normalizedName: normalizeTypeName(name),
			pluralName: pluralizeTypeName(name),
			kind: 'primitive',
			isScalar,
			scale: isScalar ? '1/1' : '0/1'
		};
		this.symbols.set(symbol.normalizedName, symbol);
		this.addName(symbol.normalizedName, symbol);
		this.addName(symbol.pluralName, symbol);
	}

	private addName(name: string, symbol: TypeSymbol): void {
		const key = normalizeTypeName(name);
		if (!this.names.has(key)) {
			this.names.set(key, symbol);
		}
	}

	private resolveScale(symbol: TypeSymbol, resolving: Set<TypeSymbol>): boolean {
		if (symbol.kind === 'primitive') {
			return symbol.isScalar;
		}
		if (symbol.scalarFactor === undefined || !symbol.declaration) {
			return false;
		}
		if (resolving.has(symbol)) {
			return false;
		}

		if (
			isNumberTypeName(symbol.declaration.baseType.name) &&
			this.lookup(symbol.declaration.baseType.name)
		) {
			symbol.scale = formatFraction(BigInt(symbol.scalarFactor), 1n);
			symbol.isScalar = true;
			symbol.kind = 'scalar';
			return true;
		}

		resolving.add(symbol);
		const baseType = this.lookup(symbol.declaration.baseType.name);
		if (!baseType || !this.resolveScale(baseType, resolving)) {
			resolving.delete(symbol);
			return false;
		}

		const [baseNumerator, baseDenominator] = parseFraction(baseType.scale);
		const numerator = baseNumerator * BigInt(symbol.scalarFactor);
		symbol.scale = formatFraction(numerator, baseDenominator);
		symbol.isScalar = true;
		symbol.kind = 'scalar';
		resolving.delete(symbol);
		return true;
	}
}

function isNumberTypeName(name: string): boolean {
	const normalizedName = normalizeTypeName(name);
	return normalizedName === 'número' || normalizedName === normalizeTypeName(pluralize('número'));
}

export interface ParsedDocument {
	declarations: TypeDeclaration[];
	globalVariables: GlobalVariableDeclaration[];
	routines: RoutineDeclaration[];
	symbols: TypeSymbolTable;
	globalVariableSymbols: GlobalVariableSymbolTable;
	routineSymbols: RoutineSymbolTable;
	diagnostics: ParserDiagnostic[];
}

const indefiniteArticles = new Set(['um', 'uma', 'uns', 'umas']);
const definiteArticles = new Set(['o', 'os', 'a', 'as']);
const conjunctions = new Set(['e', 'ou', 'nem']);
const routineNameDelimiters = new Set([
	'abaixo', 'acerca', 'acima', 'acordo', 'algum', 'ante', 'antes', 'aproximadamente',
	'após', 'através', 'até', 'cerca', 'com', 'começando', 'como', 'comprida', 'comprido',
	'dada', 'dado', 'dando', 'debaixo', 'dentre', 'dentro', 'depois', 'desde', 'durante',
	'em', 'enquanto', 'entre', 'então', 'menores', 'para', 'parde', 'parecida', 'parecido',
	'partindo', 'partir', 'perante', 'perto', 'por', 'próximo', 'qual', 'quanto', 'quão',
	'regressivamente', 'relativa', 'resultando', 'sem', 'semelhante', 'similar', 'sob',
	'sobre', 'somente', 'só', 'tal', 'tanto', 'tão', 'usando', 'versus', 'via', 'voltada',
	'voltado', 'cima', 'contendo', 'embaixo', 'pela', 'pelo', 'retornando', 'é', 'está',
	'estiver', 'for', 'forem', 'são', 'estão', 'estiverem', 'ser', 'serem', 'estar',
	'poder', 'puder', 'foi', 'estamos', 'há', 'pode', 'existe', 'existir', 'contém',
	'contiver', 'possui', 'possuir', 'dum', 'duma', 'duns', 'dumas'
]);
const reservedIdentifierWords = new Set([
	...routineNameDelimiters,
	...conjunctions,
	'denominado', 'denominada', 'denominados', 'denominadas', 'chamado', 'chamada',
	'chamados', 'chamadas', 'para', 'que', 'se', 'determine', 'rotina', 'função'
]);

export function normalizeTypeName(name: string): string {
	return name.trim().replace(/\s+/gu, ' ').toLocaleLowerCase('pt-BR');
}

function pluralizeTypeName(name: string): string {
	const words = name.trim().split(/\s+/u);
	const lastWord = words.pop();
	if (lastWord) {
		words.push(pluralize(lastWord));
	}
	return words.join(' ');
}

export function parseTypeDeclarations(source: string): ParsedDocument {
	const diagnostics: ParserDiagnostic[] = [];
	const parserSource = maskComments(source, diagnostics);
	const declarations: TypeDeclaration[] = [];
	const globalVariables: GlobalVariableDeclaration[] = [];
	const routines = parseRoutineDeclarations(parserSource, diagnostics);
	let segmentStart = 0;
	let periodIndex = findDeclarationPeriod(parserSource, segmentStart);

	while (periodIndex !== -1) {
		const declarationStart = findDeclarationStart(parserSource, segmentStart, periodIndex);
		const article = declarationStart === undefined
			? undefined
			: readWord(parserSource, declarationStart, periodIndex);
		if (article && definiteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
			const variable = parseGlobalVariableDeclaration(
				parserSource,
				declarationStart!,
				periodIndex,
				diagnostics
			);
			if (variable) {
				globalVariables.push(variable);
			}
		} else if (article) {
			const declaration = parseDeclaration(parserSource, declarationStart!, periodIndex, diagnostics);
			if (declaration) {
				declarations.push(declaration);
			}
		}
		segmentStart = periodIndex + 1;
		periodIndex = findDeclarationPeriod(parserSource, segmentStart);
	}
	const symbols = new TypeSymbolTable(declarations);
	const globalVariableSymbols = new GlobalVariableSymbolTable(globalVariables);
	const routineSymbols = new RoutineSymbolTable(routines);
	setRoutineBodyRanges(
		parserSource,
		routines,
		[...declarations, ...globalVariables].map(declaration => declaration.range)
	);
	validateBaseTypes(declarations, symbols, diagnostics);
	validateGlobalVariableTypes(globalVariables, symbols, diagnostics);
	validateReservedNames(parserSource, declarations, globalVariables, diagnostics);
	validateIdentifierPunctuation(
		parserSource,
		[...declarations, ...globalVariables].map(declaration => declaration.name),
		diagnostics
	);
	resolveFields(parserSource, [...declarations, ...globalVariables], symbols, diagnostics);
	resolveRoutineParameters(parserSource, routines, symbols, diagnostics);

	return {
		declarations,
		globalVariables,
		routines,
		symbols,
		globalVariableSymbols,
		routineSymbols,
		diagnostics
	};
}

function validateIdentifierPunctuation(
	source: string,
	identifiers: TypeReference[],
	diagnostics: ParserDiagnostic[]
): void {
	for (const identifier of identifiers) {
		for (let index = identifier.range.start; index < identifier.range.end; index++) {
			const character = source[index];
			if (character !== ':' && character !== ';' && character !== '.') {
				continue;
			}
			diagnostics.push({
				message: `The character "${character}" cannot appear in an identifier.`,
				range: { start: index, end: index + 1 }
			});
		}
	}
}

function findDeclarationStart(source: string, start: number, end: number): number | undefined {
	let lineStart = start;
	while (lineStart <= end) {
		if (lineStart < end && !/\s/u.test(source[lineStart])) {
			const article = readWord(source, lineStart, end);
			if (
				article &&
				(indefiniteArticles.has(article.value.toLocaleLowerCase('pt-BR')) ||
					definiteArticles.has(article.value.toLocaleLowerCase('pt-BR')))
			) {
				return lineStart;
			}
		}
		const nextLineFeed = source.indexOf('\n', lineStart);
		const nextCarriageReturn = source.indexOf('\r', lineStart);
		const nextLineBreak = [nextLineFeed, nextCarriageReturn]
			.filter(index => index !== -1)
			.reduce((nearest, index) => Math.min(nearest, index), Number.POSITIVE_INFINITY);
		if (!Number.isFinite(nextLineBreak) || nextLineBreak >= end) {
			break;
		}
		lineStart = nextLineBreak + 1;
	}
	return undefined;
}

function setRoutineBodyRanges(
	source: string,
	routines: RoutineDeclaration[],
	declarationRanges: SourceRange[]
): void {
	for (const routine of routines) {
		const bodyStart = routine.bodyRange.start;
		const nextRoutineStart = routines
			.filter(candidate => candidate.range.start > routine.range.start)
			.reduce((nearest, candidate) => Math.min(nearest, candidate.range.start), source.length);
		const nextDeclarationStart = declarationRanges
			.filter(range => range.start > bodyStart)
			.reduce((nearest, range) => Math.min(nearest, range.start), source.length);
		routine.bodyRange.end = Math.min(nextRoutineStart, nextDeclarationStart, source.length);
	}
}

function validateReservedNames(
	source: string,
	declarations: TypeDeclaration[],
	globalVariables: GlobalVariableDeclaration[],
	diagnostics: ParserDiagnostic[]
): void {
	for (const identifier of [
		...declarations.map(declaration => declaration.name),
		...globalVariables.map(declaration => declaration.name)
	]) {
		const words = /\p{L}+/gu;
		const text = source.slice(identifier.range.start, identifier.range.end);
		let match: RegExpExecArray | null;
		while ((match = words.exec(text))) {
			if (!reservedIdentifierWords.has(match[0].toLocaleLowerCase('pt-BR'))) {
				continue;
			}
			const start = identifier.range.start + match.index;
			diagnostics.push({
				message: `Reserved word "${match[0]}" cannot be used in an identifier.`,
				range: { start, end: start + match[0].length }
			});
		}
	}
}

interface ParsedRoutineHeader {
	name: TypeReference;
	parameters: RoutineParameter[];
	returnParameter?: RoutineParameter;
	annotation?: 'rotina' | 'função';
	isBooleanFunction: boolean;
	isPrimary: boolean;
	range: SourceRange;
}

function parseRoutineDeclarations(
	source: string,
	diagnostics: ParserDiagnostic[]
): RoutineDeclaration[] {
		const headerPattern = /(?:(rotina|função)\s+)?para\s+que\s+se(?:\s+(determine)\s+(se))?/giu;
		const headers: ParsedRoutineHeader[] = [];
		let match: RegExpExecArray | null;

		while ((match = headerPattern.exec(source))) {
			const lineStart = Math.max(
				source.lastIndexOf('\n', match.index),
				source.lastIndexOf('\r', match.index)
			) + 1;
			if (match.index !== lineStart) {
				continue;
			}

			const terminatorIndex = source.slice(headerPattern.lastIndex, source.length)
				.search(/[:;]/u);
			if (terminatorIndex === -1) {
				continue;
			}
			const headerEnd = headerPattern.lastIndex + terminatorIndex;
			const usingMarker = findWord(source, headerPattern.lastIndex, headerEnd, 'usando');
			const returningMarker = findWord(source, headerPattern.lastIndex, headerEnd, 'retornando');
			const nameEnd = Math.min(
				usingMarker?.start ?? headerEnd,
				returningMarker?.start ?? headerEnd
			);
			const nameRange = trimRange(source, headerPattern.lastIndex, nameEnd);
			if (nameRange.start === nameRange.end) {
				diagnostics.push({
					message: 'Routine name is required.',
					range: { start: match.index, end: headerEnd }
				});
				headerPattern.lastIndex = headerEnd + 1;
				continue;
			}

			const parametersEnd = returningMarker?.start ?? headerEnd;
			const parameters = usingMarker
				? parseRoutineParameters(source, usingMarker.end, parametersEnd, diagnostics)
				: [];
			if (usingMarker && parameters.length === 0) {
				diagnostics.push({
					message: 'At least one parameter is required after "usando".',
					range: { start: usingMarker.start, end: usingMarker.end }
				});
			}
			const returnParameter = returningMarker
				? parseRoutineParameter(source, returningMarker.end, headerEnd)
				: undefined;
			if (returningMarker && !returnParameter) {
				diagnostics.push({
					message: 'A return type is required after "retornando".',
					range: { start: returningMarker.start, end: headerEnd }
				});
			}

			headers.push({
				name: createTypeReference(source, nameRange),
				parameters,
				returnParameter,
				annotation: match[1]?.toLocaleLowerCase('pt-BR') as 'rotina' | 'função' | undefined,
				isBooleanFunction: Boolean(match[2]),
				isPrimary: source[headerEnd] === ':',
				range: { start: match.index, end: headerEnd + 1 }
			});
			headerPattern.lastIndex = headerEnd + 1;
		}

		const declarations: RoutineDeclaration[] = [];
		let alternateHeaders: ParsedRoutineHeader[] = [];
		let previousEnd: number | undefined;
		for (const header of headers) {
			if (
				previousEnd !== undefined &&
				source.slice(previousEnd, header.range.start).trim().length > 0
			) {
				alternateHeaders = [];
			}
			previousEnd = header.range.end;
			if (!header.isPrimary) {
				alternateHeaders.push(header);
				continue;
			}

			declarations.push({
				name: header.name,
				alternateNames: alternateHeaders.map(alternate => alternate.name),
				parameters: header.parameters,
				returnParameter: header.returnParameter,
				annotation: header.annotation,
				isBooleanFunction: header.isBooleanFunction,
				range: {
					start: alternateHeaders[0]?.range.start ?? header.range.start,
					end: header.range.end
				},
				bodyRange: { start: header.range.end, end: source.length }
			});
			alternateHeaders = [];
		}

		return declarations;
	}

function parseRoutineParameters(
	source: string,
	start: number,
	end: number,
	diagnostics: ParserDiagnostic[]
): RoutineParameter[] {
		const parameters: RoutineParameter[] = [];
		let parameterStart = skipWhitespace(source, start, end);
		while (parameterStart < end) {
			const separator = findRoutineParameterSeparator(source, parameterStart, end);
			const parameterEnd = separator?.start ?? end;
			const parameter = parseRoutineParameter(source, parameterStart, parameterEnd);
			if (!parameter) {
				diagnostics.push({
					message: 'Invalid routine parameter declaration.',
					range: trimRange(source, parameterStart, parameterEnd)
				});
			} else {
				parameters.push(parameter);
			}
			if (!separator) {
				break;
			}
			parameterStart = separator.nextStart;
		}
		return parameters;
	}

function parseRoutineParameter(
	source: string,
	start: number,
	end: number
): RoutineParameter | undefined {
		const parameterStart = skipWhitespace(source, start, end);
		const article = readWord(source, parameterStart, end);
		if (!article || !indefiniteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
			return undefined;
		}

		const markers = new Set([
			'denominado', 'denominada', 'denominados', 'denominadas',
			'chamado', 'chamada', 'chamados', 'chamadas'
		]);
		const marker = findAnyWord(source, article.end, end, markers);
		const typeRange = trimRange(source, article.end, marker?.start ?? end);
		const nameRange = marker
			? trimRange(source, marker.end, end)
			: typeRange;
		if (typeRange.start === typeRange.end || nameRange.start === nameRange.end) {
			return undefined;
		}

		return {
			name: createTypeReference(source, nameRange),
			type: createTypeReference(source, typeRange)
		};
	}

function findRoutineParameterSeparator(
	source: string,
	start: number,
	end: number
): { start: number; nextStart: number } | undefined {
		const commaIndex = source.indexOf(',', start);
		let separator = commaIndex !== -1 && commaIndex < end
			? { start: commaIndex, nextStart: skipWhitespace(source, commaIndex + 1, end) }
			: undefined;
		const words = /\p{L}+/gu;
		words.lastIndex = start;
		let match: RegExpExecArray | null;
		while ((match = words.exec(source)) && match.index < end) {
			const wordEnd = match.index + match[0].length;
			const word = match[0].toLocaleLowerCase('pt-BR');
			if (
				!conjunctions.has(word) ||
				isWordCharacter(match.index > start ? source[match.index - 1] : '') ||
				isWordCharacter(wordEnd < end ? source[wordEnd] : '')
			) {
				continue;
			}
			if (separator && separator.start < match.index) {
				break;
			}
			const nextStart = skipWhitespace(source, wordEnd, end);
			const nextArticle = readWord(source, nextStart, end);
			if (nextArticle && indefiniteArticles.has(nextArticle.value.toLocaleLowerCase('pt-BR'))) {
				separator = { start: match.index, nextStart };
				break;
			}
		}
		return separator;
	}

function resolveRoutineParameters(
	source: string,
	routines: RoutineDeclaration[],
	symbols: TypeSymbolTable,
	diagnostics: ParserDiagnostic[]
): void {
		for (const routine of routines) {
			const parameters = [
				...routine.parameters,
				...(routine.returnParameter ? [routine.returnParameter] : [])
			];
			for (const parameter of parameters) {
				const typeText = source.slice(parameter.type.range.start, parameter.type.range.end);
				const words = [...typeText.matchAll(/\S+/gu)];
				let resolvedType: TypeReference | undefined;
				for (let firstWord = 0; firstWord < words.length; firstWord++) {
					const candidateName = words.slice(firstWord).map(word => word[0]).join(' ');
					if (!symbols.lookup(candidateName)) {
						continue;
					}
					resolvedType = createTypeReference(source, {
						start: parameter.type.range.start + words[firstWord].index!,
						end: parameter.type.range.end
					});
					break;
				}
				if (!resolvedType) {
					diagnostics.push({
						message: `Unknown routine parameter type "${parameter.type.name}".`,
						range: parameter.type.range
					});
					continue;
				}
				parameter.type = resolvedType;
		}
	}
}

function maskComments(source: string, diagnostics: ParserDiagnostic[]): string {
	const characters = source.split('');
	let inString = false;
	let inBlockComment = false;

	for (let index = 0; index < characters.length; index++) {
		const character = characters[index];
		const nextCharacter = characters[index + 1];

		if (inBlockComment) {
			if (character === ']') {
				characters[index] = ' ';
				inBlockComment = false;
			} else if (/[\p{Cc}]/u.test(character)) {
				diagnostics.push({
					message: 'Non-printable characters are not allowed in comments.',
					range: { start: index, end: index + 1 }
				});
				if (character !== '\n' && character !== '\r') {
					characters[index] = ' ';
				}
			} else {
				characters[index] = ' ';
			}
			continue;
		}

		if (inString) {
			if (character === '"' && nextCharacter === '"') {
				index++;
				continue;
			}
			if (character === '"') {
				inString = false;
			}
			continue;
		}

		if (character === '"') {
			inString = true;
			continue;
		}

		if (character === '[') {
			characters[index] = ' ';
			inBlockComment = true;
			continue;
		}

		if (character === '\\') {
			characters[index] = ' ';
			for (; index < characters.length; index++) {
				const commentCharacter = characters[index];
				if (commentCharacter === '\n' || commentCharacter === '\r') {
					break;
				}
				if (/[\p{Cc}]/u.test(commentCharacter)) {
					diagnostics.push({
						message: 'Non-printable characters are not allowed in comments.',
						range: { start: index, end: index + 1 }
					});
				}
				characters[index] = ' ';
			}
		}
	}

	return characters.join('');
}

function parseGlobalVariableDeclaration(
	source: string,
	segmentStart: number,
	periodIndex: number,
	diagnostics: ParserDiagnostic[]
): GlobalVariableDeclaration | undefined {
	let contentStart = segmentStart;
	while (contentStart < periodIndex && /\s/u.test(source[contentStart])) {
		contentStart++;
	}

	const article = readWord(source, contentStart, periodIndex);
	if (!article || !definiteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
		return undefined;
	}
	const operator = findOperator(source, article.end, periodIndex);
	if (!operator) {
		return undefined;
	}
	const nameRange = trimRange(source, article.end, operator.start);
	if (nameRange.start === nameRange.end) {
		return undefined;
	}

	const typeArticle = readWord(source, operator.end, periodIndex);
	const hasExplicitType = Boolean(
		typeArticle && indefiniteArticles.has(typeArticle.value.toLocaleLowerCase('pt-BR'))
	);
	let type: TypeReference | undefined;
	let initializer: GlobalVariableLiteral | undefined;
	let inferredTypeName: string | undefined;

	if (hasExplicitType && typeArticle) {
		const fieldsKeyword = findWord(source, typeArticle.end, periodIndex, 'com');
		const initializerMarker = findEqualTo(
			source,
			fieldsKeyword?.start ?? typeArticle.end,
			periodIndex
		);
		const typeRange = trimRange(
			source,
			typeArticle.end,
			fieldsKeyword?.start ?? initializerMarker?.start ?? periodIndex
		);
		if (typeRange.start === typeRange.end) {
			return undefined;
		}
		type = createTypeReference(source, typeRange);
		let fields: TypeField[] | undefined;
		if (fieldsKeyword) {
			const fieldsEnd = initializerMarker?.start ?? periodIndex;
			const parsedFields = parseFields(source, fieldsKeyword.end, fieldsEnd);
			if (!parsedFields) {
				return undefined;
			}
			fields = parsedFields.fields;
			diagnostics.push(...parsedFields.diagnostics);
		}
		if (initializerMarker) {
			const initializerRange = trimRange(source, initializerMarker.end, periodIndex);
			initializer = parseGlobalVariableLiteral(source, initializerRange);
			if (!initializer) {
				diagnostics.push({
					message: 'Invalid global variable initializer.',
					range: initializerRange
				});
			}
		}
		return {
			kind: 'global-variable-declaration',
			name: createTypeReference(source, nameRange),
			type,
			fields,
			initializer,
			article: article.value.toLocaleLowerCase('pt-BR'),
			operator: operator.value,
			range: { start: contentStart, end: periodIndex + 1 }
		};
	} else {
		const initializerRange = trimRange(source, operator.end, periodIndex);
		initializer = parseGlobalVariableLiteral(source, initializerRange);
		if (!initializer) {
			diagnostics.push({
				message: 'Invalid global variable initializer.',
				range: initializerRange
			});
		} else {
			inferredTypeName = inferGlobalVariableTypeName(initializer);
		}
	}

	return {
		kind: 'global-variable-declaration',
		name: createTypeReference(source, nameRange),
		type,
		inferredTypeName,
		initializer,
		article: article.value.toLocaleLowerCase('pt-BR'),
		operator: operator.value,
		range: { start: contentStart, end: periodIndex + 1 }
	};
}

function inferGlobalVariableTypeName(literal: GlobalVariableLiteral): string {
	switch (literal.kind) {
		case 'integer':
			return 'número';
		case 'fraction':
		case 'mixed':
			return 'fração';
		case 'hexadecimal':
			return 'texto hexadecimal';
		case 'string':
			return 'string';
	}
}

function findDeclarationPeriod(source: string, start: number): number {
	let inString = false;
	for (let index = start; index < source.length; index++) {
		if (source[index] === '"') {
			if (!inString) {
				inString = true;
				continue;
			}
			if (source[index + 1] === '"') {
				if (
					source[index + 2] === '.' &&
					(index + 3 === source.length || /\s/u.test(source[index + 3]))
				) {
					inString = false;
					index++;
					continue;
				}
				index++;
				continue;
			}
			inString = false;
			continue;
		}
		if (source[index] === '.' && !inString) {
			return index;
		}
	}
	return -1;
}

function findEqualTo(
	source: string,
	start: number,
	end: number
): { start: number; end: number } | undefined {
	const marker = /\bigual\s+a\b/giu;
	marker.lastIndex = start;
	const match = marker.exec(source);
	if (!match || match.index >= end || match.index + match[0].length > end) {
		return undefined;
	}
	return { start: match.index, end: match.index + match[0].length };
}

function parseGlobalVariableLiteral(
	source: string,
	range: SourceRange
): GlobalVariableLiteral | undefined {
	const text = source.slice(range.start, range.end);
	if (/^[+-]?\d+$/u.test(text)) {
		const value = Number(text);
		return Number.isSafeInteger(value) && value >= -2147483648 && value <= 2147483647
			? { kind: 'integer', text, range }
			: undefined;
	}

	const mixed = /^([+-]?\d+)\+([+-]?\d+)\/([+-]?\d+)$/u.exec(text);
	if (mixed) {
		return mixed.slice(1).every(isSigned32BitInteger)
			? { kind: 'mixed', text, range }
			: undefined;
	}

	const fraction = /^([+-]?\d+)\/([+-]?\d+)$/u.exec(text);
	if (fraction) {
		return fraction.slice(1).every(isSigned32BitInteger)
			? { kind: 'fraction', text, range }
			: undefined;
	}

	if (/^\$[a-f\d]+$/iu.test(text)) {
		return { kind: 'hexadecimal', text, range };
	}

	if (isValidStringLiteral(text)) {
		return { kind: 'string', text, range };
	}

	return undefined;
}

function isSigned32BitInteger(value: string): boolean {
	const number = Number(value);
	return Number.isSafeInteger(number) && number >= -2147483648 && number <= 2147483647;
}

function isValidStringLiteral(text: string): boolean {
	if (text.length < 2 || text[0] !== '"' || text[text.length - 1] !== '"') {
		return false;
	}

	const hasEscapedQuoteAndTerminator = text.endsWith('""') && !text.endsWith('"""');
	const contentEnd = hasEscapedQuoteAndTerminator ? text.length - 2 : text.length - 1;
	for (let index = 1; index < contentEnd; index++) {
		const character = text[index];
		if (/[\p{Cc}]/u.test(character)) {
			return false;
		}
		if (character === '"') {
			if (text[index + 1] !== '"' || index + 1 >= contentEnd) {
				return false;
			}
			index++;
		}
	}
	return true;
}

function validateGlobalVariableTypes(
	declarations: GlobalVariableDeclaration[],
	symbols: TypeSymbolTable,
	diagnostics: ParserDiagnostic[]
): void {
	for (const declaration of declarations) {
		if (!declaration.type || symbols.lookup(declaration.type.name)) {
			continue;
		}
		diagnostics.push({
			message: `Unknown global variable type "${declaration.type.name}".`,
			range: declaration.type.range
		});
	}
}

function validateBaseTypes(
	declarations: TypeDeclaration[],
	symbols: TypeSymbolTable,
	diagnostics: ParserDiagnostic[]
): void {
	for (const declaration of declarations) {
		if (symbols.lookup(declaration.baseType.name)) {
			continue;
		}
		diagnostics.push({
			message: `Unknown base type "${declaration.baseType.name}".`,
			range: declaration.baseType.range
		});
	}
}

function resolveFields(
	source: string,
	declarations: Pick<TypeDeclaration | GlobalVariableDeclaration, 'fields'>[],
	symbols: TypeSymbolTable,
	diagnostics: ParserDiagnostic[]
): void {
	for (const declaration of declarations) {
		const fields = declaration.fields?.filter(
			(field): field is NamedTypeField => field.kind === 'named'
		) ?? [];
		const fieldNames = new Map<string, TypeReference>();

		for (const field of fields) {
			let resolvedType: TypeReference | undefined;
			if (field.usesTypeAlias) {
				const aliasText = source.slice(field.name.range.start, field.name.range.end);
				const words = [...aliasText.matchAll(/\S+/gu)];
				for (let firstWord = 0; firstWord < words.length; firstWord++) {
					const candidateName = words.slice(firstWord).map(word => word[0]).join(' ');
					if (!symbols.lookup(candidateName)) {
						continue;
					}
					const typeStart = field.name.range.start + words[firstWord].index!;
					resolvedType = createTypeReference(source, {
						start: typeStart,
						end: field.name.range.end
					});
					break;
				}
				if (!resolvedType) {
					diagnostics.push({
						message: `No type matches field alias "${field.name.name}".`,
						range: field.name.range
					});
				} else {
					field.type = resolvedType;
				}
			} else if (symbols.lookup(field.type.name)) {
				resolvedType = field.type;
			} else {
				diagnostics.push({
					message: `Unknown field type "${field.type.name}".`,
					range: field.type.range
				});
			}

			const fieldName = normalizeTypeName(field.name.name);
			if (fieldNames.has(fieldName)) {
				diagnostics.push({
					message: `Duplicate field name "${field.name.name}".`,
					range: field.name.range
				});
			} else {
				fieldNames.set(fieldName, field.name);
			}
		}
	}
}

function parseFraction(fraction: string): [bigint, bigint] {
	const [numerator, denominator] = fraction.split('/');
	return [BigInt(numerator), BigInt(denominator)];
}

function formatFraction(numerator: bigint, denominator: bigint): string {
	const divisor = greatestCommonDivisor(numerator, denominator);
	return `${numerator / divisor}/${denominator / divisor}`;
}

function greatestCommonDivisor(first: bigint, second: bigint): bigint {
	let a = first < 0n ? -first : first;
	let b = second < 0n ? -second : second;
	while (b !== 0n) {
		[a, b] = [b, a % b];
	}
	return a || 1n;
}

export function findTypeReferenceAtOffset(
	parsedDocument: ParsedDocument,
	offset: number
): TypeReference | undefined {
	for (const declaration of parsedDocument.declarations) {
		const declarationReferences = [
			declaration.name,
			declaration.baseType,
			declaration.pointedType
		];
		for (const reference of declarationReferences) {
			if (!reference) {
				continue;
			}
			if (offset >= reference.range.start && offset <= reference.range.end) {
				return reference;
			}
		}

		for (const field of declaration.fields ?? []) {
			if (field.kind === 'byte-array') {
				if (offset >= field.elementType.range.start && offset <= field.elementType.range.end) {
					return field.elementType;
				}
				continue;
			}

			if (offset >= field.name.range.start && offset <= field.name.range.end) {
				return parsedDocument.symbols.lookup(field.name.name)
					? field.name
					: field.type;
			}
			if (offset >= field.type.range.start && offset <= field.type.range.end) {
				return field.type;
			}
		}
	}
	for (const declaration of parsedDocument.globalVariables) {
		if (
			declaration.type &&
			offset >= declaration.type.range.start &&
			offset <= declaration.type.range.end
		) {
			return declaration.type;
		}
		for (const field of declaration.fields ?? []) {
			if (field.kind === 'byte-array') {
				if (offset >= field.elementType.range.start && offset <= field.elementType.range.end) {
					return field.elementType;
				}
				continue;
			}

			if (offset >= field.name.range.start && offset <= field.name.range.end) {
				return parsedDocument.symbols.lookup(field.name.name)
					? field.name
					: field.type;
			}
			if (offset >= field.type.range.start && offset <= field.type.range.end) {
				return field.type;
			}
		}
	}
	for (const routine of parsedDocument.routines) {
		for (const parameter of [
			...routine.parameters,
			...(routine.returnParameter ? [routine.returnParameter] : [])
		]) {
			if (
				offset >= parameter.type.range.start &&
				offset <= parameter.type.range.end
			) {
				return parameter.type;
			}
		}
	}
	return undefined;
}

function parseDeclaration(
	source: string,
	segmentStart: number,
	periodIndex: number,
	diagnostics: ParserDiagnostic[]
): TypeDeclaration | undefined {
	let contentStart = segmentStart;
	while (contentStart < periodIndex && /\s/u.test(source[contentStart])) {
		contentStart++;
	}

	const derivedArticle = readWord(source, contentStart, periodIndex);
	if (!derivedArticle || !indefiniteArticles.has(derivedArticle.value.toLocaleLowerCase('pt-BR'))) {
		return undefined;
	}

	const operator = findOperator(source, derivedArticle.end, periodIndex);
	if (!operator) {
		return undefined;
	}

	const derivedNameRange = trimRange(source, derivedArticle.end, operator.start);
	const scalarFactor = readInteger(source, operator.end, periodIndex);
	let baseNameRange: SourceRange;
	let pointedType: TypeReference | undefined;
	let fields: TypeField[] | undefined;
	if (scalarFactor) {
		baseNameRange = trimRange(source, scalarFactor.end, periodIndex);
	} else {
		const baseArticle = readWord(source, operator.end, periodIndex);
		if (!baseArticle || !indefiniteArticles.has(baseArticle.value.toLocaleLowerCase('pt-BR'))) {
			return undefined;
		}

		const pointerTarget = findWord(source, baseArticle.end, periodIndex, 'para');
		const fieldsKeyword = findWord(source, baseArticle.end, pointerTarget?.start ?? periodIndex, 'com');
		baseNameRange = trimRange(
			source,
			baseArticle.end,
			fieldsKeyword?.start ?? pointerTarget?.start ?? periodIndex
		);
		if (pointerTarget) {
			const pointedArticle = readWord(source, pointerTarget.end, periodIndex);
			if (!pointedArticle || !indefiniteArticles.has(pointedArticle.value.toLocaleLowerCase('pt-BR'))) {
				return undefined;
			}
			const pointedNameRange = trimRange(source, pointedArticle.end, periodIndex);
			if (pointedNameRange.start === pointedNameRange.end) {
				return undefined;
			}
			pointedType = createTypeReference(source, pointedNameRange);
		}
		if (fieldsKeyword) {
			const parsedFields = parseFields(source, fieldsKeyword.end, periodIndex);
			if (!parsedFields) {
				return undefined;
			}
			fields = parsedFields.fields;
			diagnostics.push(...parsedFields.diagnostics);
		}
	}

	if (derivedNameRange.start === derivedNameRange.end || baseNameRange.start === baseNameRange.end) {
		return undefined;
	}

	const name = createTypeReference(source, derivedNameRange);
	const baseType = createTypeReference(source, baseNameRange);
	const normalizedScalarFactor = scalarFactor?.value
		?? (isNumberTypeName(baseType.name) ? '1' : undefined);
	if (!name.normalizedName || !baseType.normalizedName || (pointedType && !pointedType.normalizedName)) {
		return undefined;
	}

	return {
		kind: 'type-declaration',
		name,
		baseType,
		pointedType,
		fields,
		scalarFactor: normalizedScalarFactor,
		operator: operator.value,
		range: {
			start: contentStart,
			end: periodIndex + 1
		}
	};
}

function parseFields(
	source: string,
	start: number,
	end: number
): { fields: TypeField[]; diagnostics: ParserDiagnostic[] } | undefined {
	const fields: TypeField[] = [];
	const diagnostics: ParserDiagnostic[] = [];
	let fieldStart = start;

	while (fieldStart < end) {
		const count = readInteger(source, fieldStart, end);
		if (count) {
			const typeStart = skipWhitespace(source, count.end, end);
			const separator = findFieldSeparator(source, typeStart, end);
			const typeRange = trimRange(source, typeStart, separator?.start ?? end);
			if (typeRange.start === typeRange.end) {
				return undefined;
			}
			const elementType = createTypeReference(source, typeRange);
			fields.push({
				kind: 'byte-array',
				count: count.value,
				elementType,
				range: { start: count.start, end: typeRange.end }
			});
			if (!['byte', 'bytes'].includes(elementType.normalizedName)) {
				diagnostics.push({
					message: 'Only contiguous arrays of byte are supported.',
					range: typeRange
				});
			}
			if (!separator) {
				break;
			}
			fieldStart = separator.nextStart;
			continue;
		}

		const article = readWord(source, fieldStart, end);
		if (!article || !indefiniteArticles.has(article.value.toLocaleLowerCase('pt-BR'))) {
			return undefined;
		}

		const separator = findFieldSeparator(source, article.end, end);
		const fieldEnd = separator?.start ?? end;
		const marker = findFieldMarker(source, article.end, fieldEnd);
		const explicitName = marker !== undefined;
		const contentStart = explicitName ? marker.end : article.end;
		const referenceMarker = findReferenceMarker(source, contentStart, fieldEnd);
		const contentEnd = referenceMarker?.start ?? fieldEnd;
		const unionMarker = findWord(source, contentStart, contentEnd, 'sob');
		const nameRange = trimRange(source, contentStart, unionMarker?.start ?? contentEnd);
		const typeRange = explicitName
			? trimRange(source, article.end, marker.start)
			: nameRange;
		if (typeRange.start === typeRange.end || nameRange.start === nameRange.end) {
			return undefined;
		}
		const unionTarget = unionMarker
			? parseUnionTarget(source, unionMarker.end, contentEnd)
			: undefined;
		if (unionMarker && !unionTarget) {
			return undefined;
		}

		fields.push({
			kind: 'named',
			type: createTypeReference(source, typeRange),
			name: createTypeReference(source, nameRange),
			unionTarget,
			usesTypeAlias: !explicitName,
			isReference: referenceMarker !== undefined
		});
		if (!separator) {
			break;
		}
		fieldStart = separator.nextStart;
	}

	return fields.length > 0 ? { fields, diagnostics } : undefined;
}

function findReferenceMarker(
	source: string,
	start: number,
	end: number
): { start: number; end: number } | undefined {
	const marker = /\(\s*referência\s*\)/giu;
	marker.lastIndex = start;
	const match = marker.exec(source);
	return match && match.index < end && match.index + match[0].length <= end
		? { start: match.index, end: match.index + match[0].length }
		: undefined;
}

function skipWhitespace(source: string, start: number, end: number): number {
	while (start < end && /\s/u.test(source[start])) {
		start++;
	}
	return start;
}

function parseUnionTarget(source: string, start: number, end: number): TypeReference | undefined {
	const article = readWord(source, start, end);
	if (!article || !new Set(['o', 'a', 'os', 'as']).has(article.value.toLocaleLowerCase('pt-BR'))) {
		return undefined;
	}

	const targetRange = trimRange(source, article.end, end);
	if (targetRange.start === targetRange.end) {
		return undefined;
	}
	return createTypeReference(source, targetRange);
}

function findFieldMarker(
	source: string,
	start: number,
	end: number
): { start: number; end: number } | undefined {
	const markers = new Set(['denominado', 'denominada', 'denominados', 'denominadas']);
	const words = /\p{L}+/gu;
	words.lastIndex = start;
	let match: RegExpExecArray | null;
	while ((match = words.exec(source)) && match.index < end) {
		const wordEnd = match.index + match[0].length;
		const previousCharacter = match.index > start ? source[match.index - 1] : '';
		const nextCharacter = wordEnd < end ? source[wordEnd] : '';
		if (
			!isWordCharacter(previousCharacter) &&
			!isWordCharacter(nextCharacter) &&
			markers.has(match[0].toLocaleLowerCase('pt-BR'))
		) {
			return { start: match.index, end: wordEnd };
		}
	}
	return undefined;
}

function findAnyWord(
	source: string,
	start: number,
	end: number,
	expectedWords: Set<string>
): { start: number; end: number; value: string } | undefined {
	const words = /\p{L}+/gu;
	words.lastIndex = start;
	let match: RegExpExecArray | null;
	while ((match = words.exec(source)) && match.index < end) {
		const wordEnd = match.index + match[0].length;
		if (
			!isWordCharacter(match.index > start ? source[match.index - 1] : '') &&
			!isWordCharacter(wordEnd < end ? source[wordEnd] : '') &&
			expectedWords.has(match[0].toLocaleLowerCase('pt-BR'))
		) {
			return { start: match.index, end: wordEnd, value: match[0] };
		}
	}
	return undefined;
}

function findFieldSeparator(
	source: string,
	start: number,
	end: number
): { start: number; nextStart: number } | undefined {
	const commaIndex = source.indexOf(',', start);
	let separator = commaIndex !== -1 && commaIndex < end
		? { start: commaIndex, nextStart: skipWhitespace(source, commaIndex + 1, end) }
		: undefined;
	const words = /\p{L}+/gu;
	words.lastIndex = start;
	let match: RegExpExecArray | null;
	while ((match = words.exec(source)) && match.index < end) {
		const wordEnd = match.index + match[0].length;
		if (
			match[0].toLocaleLowerCase('pt-BR') !== 'e' ||
			isWordCharacter(match.index > start ? source[match.index - 1] : '') ||
			isWordCharacter(wordEnd < end ? source[wordEnd] : '')
		) {
			continue;
		}
		if (separator && separator.start < match.index) {
			break;
		}
		const nextStart = skipWhitespace(source, wordEnd, end);
		const nextArticle = readWord(source, nextStart, end);
		const nextCount = readInteger(source, nextStart, end);
		if (
			(nextArticle && indefiniteArticles.has(nextArticle.value.toLocaleLowerCase('pt-BR'))) ||
			nextCount
		) {
			separator = { start: match.index, nextStart };
			break;
		}
	}

	return separator;
}

function readInteger(
	source: string,
	start: number,
	end: number
): { value: string; start: number; end: number } | undefined {
	let numberStart = start;
	while (numberStart < end && /\s/u.test(source[numberStart])) {
		numberStart++;
	}
	const match = /^\d+/u.exec(source.slice(numberStart, end));
	if (!match || !/\s/u.test(source[numberStart + match[0].length] ?? '')) {
		return undefined;
	}
	return {
		value: match[0],
		start: numberStart,
		end: numberStart + match[0].length
	};
}

function findOperator(
	source: string,
	start: number,
	end: number
): { value: 'é' | 'são'; start: number; end: number } | undefined {
	const words = /\p{L}+/gu;
	words.lastIndex = start;
	let match: RegExpExecArray | null;
	while ((match = words.exec(source)) && match.index < end) {
		const wordEnd = match.index + match[0].length;
		const previousCharacter = match.index > start ? source[match.index - 1] : '';
		const nextCharacter = wordEnd < end ? source[wordEnd] : '';
		if (isWordCharacter(previousCharacter) || isWordCharacter(nextCharacter)) {
			continue;
		}

		const normalizedWord = match[0].toLocaleLowerCase('pt-BR');
		if (normalizedWord === 'é' || normalizedWord === 'são') {
			return { value: normalizedWord, start: match.index, end: wordEnd };
		}
	}
	return undefined;
}

function findWord(
	source: string,
	start: number,
	end: number,
	expectedWord: string
): { start: number; end: number } | undefined {
	const words = /\p{L}+/gu;
	words.lastIndex = start;
	let match: RegExpExecArray | null;
	while ((match = words.exec(source)) && match.index < end) {
		const wordEnd = match.index + match[0].length;
		const previousCharacter = match.index > start ? source[match.index - 1] : '';
		const nextCharacter = wordEnd < end ? source[wordEnd] : '';
		if (
			!isWordCharacter(previousCharacter) &&
			!isWordCharacter(nextCharacter) &&
			match[0].toLocaleLowerCase('pt-BR') === expectedWord
		) {
			return { start: match.index, end: wordEnd };
		}
	}
	return undefined;
}

function readWord(
	source: string,
	start: number,
	end: number
): { value: string; start: number; end: number } | undefined {
	let wordStart = start;
	while (wordStart < end && /\s/u.test(source[wordStart])) {
		wordStart++;
	}

	const match = /^[\p{L}\p{N}_]+/u.exec(source.slice(wordStart, end));
	if (!match) {
		return undefined;
	}
	return {
		value: match[0],
		start: wordStart,
		end: wordStart + match[0].length
	};
}

function isWordCharacter(character: string): boolean {
	return /[\p{L}\p{N}_]/u.test(character);
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

function createTypeReference(source: string, range: SourceRange): TypeReference {
	const name = source.slice(range.start, range.end).replace(/\s+/gu, ' ');
	return {
		name,
		normalizedName: normalizeTypeName(name),
		range
	};
}
