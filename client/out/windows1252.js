"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToWindows1252 = convertToWindows1252;
const windows1252ByteByCharacter = new Map();
const windows1252Decoder = new TextDecoder('windows-1252');
for (let byte = 0; byte <= 0xff; byte++) {
    const character = windows1252Decoder.decode(Uint8Array.of(byte));
    if (character !== '\uFFFD' &&
        Array.from(character).length === 1 &&
        !windows1252ByteByCharacter.has(character)) {
        windows1252ByteByCharacter.set(character, byte);
    }
}
function convertToWindows1252(source, policy) {
    const convertedCharacters = [];
    const bytes = [];
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
//# sourceMappingURL=windows1252.js.map