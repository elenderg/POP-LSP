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
	symbols: TypeSymbolTable;
	diagnostics: ParserDiagnostic[];
}

const indefiniteArticles = new Set(['um', 'uma', 'uns', 'umas']);

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
	const declarations: TypeDeclaration[] = [];
	const diagnostics: ParserDiagnostic[] = [];
	let segmentStart = 0;
	let periodIndex = source.indexOf('.', segmentStart);

	while (periodIndex !== -1) {
		const declaration = parseDeclaration(source, segmentStart, periodIndex, diagnostics);
		if (declaration) {
			declarations.push(declaration);
		}
		segmentStart = periodIndex + 1;
		periodIndex = source.indexOf('.', segmentStart);
	}
	const symbols = new TypeSymbolTable(declarations);
	resolveFields(source, declarations, symbols, diagnostics);

	return {
		declarations,
		symbols,
		diagnostics
	};
}

function resolveFields(
	source: string,
	declarations: TypeDeclaration[],
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
