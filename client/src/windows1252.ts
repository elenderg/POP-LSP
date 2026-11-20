export type UnrepresentableCharacterPolicy = 'remove' | 'replace';

export interface Windows1252Conversion {
  bytes: Uint8Array;
  text: string;
  unrepresentableCount: number;
}

const windows1252ByteByCharacter = new Map<string, number>();
const windows1252Decoder = new TextDecoder('windows-1252');

for (let byte = 0; byte <= 0xff; byte++) {
  const character = windows1252Decoder.decode(Uint8Array.of(byte));
  if (
    character !== '\uFFFD' &&
    Array.from(character).length === 1 &&
    !windows1252ByteByCharacter.has(character)
  ) {
    windows1252ByteByCharacter.set(character, byte);
  }
}

export function convertToWindows1252(
  source: string,
  policy: UnrepresentableCharacterPolicy
): Windows1252Conversion {
  const convertedCharacters: string[] = [];
  const bytes: number[] = [];
  let unrepresentableCount = 0;

  for (const character of source) {
    const byte = windows1252ByteByCharacter.get(character);
    if (byte !== undefined) {
      convertedCharacters.push(character);
      bytes.push(byte);
      continue;
    }

    unrepresentableCount++;
    if (policy === 'replace') {
      convertedCharacters.push('?');
      bytes.push(0x3f);
    }
  }

  return {
    bytes: Uint8Array.from(bytes),
    text: convertedCharacters.join(''),
    unrepresentableCount
  };
}
