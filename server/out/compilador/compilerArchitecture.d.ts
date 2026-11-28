export type WindowsTargetArchitecture = 'x86' | 'x64';
export interface WindowsTarget {
    architecture: WindowsTargetArchitecture;
    machine: number;
    peMagic: number;
    imageBase: bigint;
    pointerSize: number;
    numberSize: number;
}
export declare function getWindowsTarget(architecture: WindowsTargetArchitecture): WindowsTarget;
export declare function parseWindowsTarget(value: string | undefined): WindowsTargetArchitecture;
