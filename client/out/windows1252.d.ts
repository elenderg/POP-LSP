export type UnrepresentableCharacterPolicy = 'remove' | 'replace';
export interface Windows1252Conversion {
    bytes: Uint8Array;
    text: string;
    unrepresentableCount: number;
}
export declare function convertToWindows1252(source: string, policy: UnrepresentableCharacterPolicy): Windows1252Conversion;
