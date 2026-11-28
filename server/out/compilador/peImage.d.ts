import { WindowsTargetArchitecture } from './compilerArchitecture';
export interface PeImport {
    dll: string;
    function: string;
}
export interface PeImportCallSite extends PeImport {
    offset: number;
}
export interface PeImageOptions {
    architecture: WindowsTargetArchitecture;
    code: Buffer;
    entryPointOffset?: number;
    stackReserve?: bigint;
    stackCommit?: bigint;
    imports?: PeImport[];
    importCallSites?: PeImportCallSite[];
}
export declare function buildPeImage(options: PeImageOptions): Buffer;
