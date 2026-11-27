import { WindowsTargetArchitecture } from './compilerArchitecture';
export interface PeImageOptions {
    architecture: WindowsTargetArchitecture;
    code: Buffer;
    entryPointOffset?: number;
    stackReserve?: bigint;
    stackCommit?: bigint;
    imports?: Array<{
        dll: string;
        function: string;
    }>;
}
export declare function buildPeImage(options: PeImageOptions): Buffer;
