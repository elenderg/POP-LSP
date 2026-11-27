export type WindowsTargetArchitecture = 'x86' | 'x64';

export interface WindowsTarget {
  architecture: WindowsTargetArchitecture;
  machine: number;
  peMagic: number;
  imageBase: bigint;
  pointerSize: number;
  numberSize: number;
}

export function getWindowsTarget(architecture: WindowsTargetArchitecture): WindowsTarget {
  if (architecture === 'x64') {
    return {
      architecture,
      machine: 0x8664,
      peMagic: 0x20b,
      imageBase: 0x140000000n,
      pointerSize: 8,
      numberSize: 4
    };
  }

  return {
    architecture,
    machine: 0x14c,
    peMagic: 0x10b,
    imageBase: 0x400000n,
    pointerSize: 4,
    numberSize: 4
  };
}

export function parseWindowsTarget(value: string | undefined): WindowsTargetArchitecture {
  const normalized = value?.trim().toLowerCase();
  if (normalized === 'x64' || normalized === '64' || normalized === 'amd64') {
    return 'x64';
  }
  return 'x86';
}
