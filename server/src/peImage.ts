import { getWindowsTarget, WindowsTarget, WindowsTargetArchitecture } from './compilerArchitecture';

export interface PeImageOptions {
  architecture: WindowsTargetArchitecture;
  code: Buffer;
  entryPointOffset?: number;
  stackReserve?: bigint;
  stackCommit?: bigint;
  imports?: Array<{ dll: string; function: string }>;
}

function alignUp(value: number, alignment: number): number {
  return Math.ceil(value / alignment) * alignment;
}

function writePointer(buffer: Buffer, offset: number, value: bigint, architecture: WindowsTargetArchitecture): void {
  if (architecture === 'x64') {
    buffer.writeBigUInt64LE(value, offset);
  } else {
    if (value > 0xffffffffn) {
      throw new RangeError('A 32-bit PE value exceeds DWORD range');
    }
    buffer.writeUInt32LE(Number(value), offset);
  }
}

export function buildPeImage(options: PeImageOptions): Buffer {
  const target = getWindowsTarget(options.architecture);
  if (options.entryPointOffset === undefined || options.entryPointOffset < 0 || options.entryPointOffset >= options.code.length) {
    throw new RangeError('Entry point must point into the code section');
  }

  const fileAlignment = 0x200;
  const sectionAlignment = 0x1000;
  const dosSize = 0x80;
  const optionalSize = target.architecture === 'x64' ? 0xf0 : 0xe0;
  const sectionHeadersOffset = dosSize + 4 + 20 + optionalSize;
  const headersSize = alignUp(sectionHeadersOffset + 40, fileAlignment);
  const codeSize = alignUp(options.code.length, fileAlignment);
  const codeRawOffset = headersSize;
  const codeRva = sectionAlignment;
  const imageSize = alignUp(codeRva + alignUp(options.code.length, sectionAlignment), sectionAlignment);
  const image = Buffer.alloc(codeRawOffset + codeSize);

  // DOS header and DOS stub signature.
  image.writeUInt16LE(0x5a4d, 0);
  image.writeUInt32LE(dosSize, 0x3c);

  const peOffset = dosSize;
  image.writeUInt32LE(0x4550, peOffset);

  // COFF header
  image.writeUInt16LE(target.machine, peOffset + 4);
  image.writeUInt16LE(1, peOffset + 6);
  image.writeUInt32LE(0, peOffset + 8);
  image.writeUInt32LE(0, peOffset + 12);
  image.writeUInt32LE(0, peOffset + 16);
  image.writeUInt16LE(optionalSize, peOffset + 20);
  image.writeUInt16LE(0x0102, peOffset + 22);

  const optional = peOffset + 24;
  image.writeUInt16LE(target.peMagic, optional);
  image.writeUInt16LE(0x0000, optional + 2);
  image.writeUInt32LE(options.code.length, optional + 4);
  image.writeUInt32LE(0, optional + 8);
  image.writeUInt32LE(0, optional + 12);
  image.writeUInt32LE(codeRva + options.entryPointOffset, optional + 16);
  image.writeUInt32LE(codeRva, optional + 20);

  if (target.architecture === 'x64') {
    writePointer(image, optional + 24, target.imageBase, 'x64');
    image.writeUInt32LE(sectionAlignment, optional + 32);
    image.writeUInt32LE(fileAlignment, optional + 36);
    image.writeUInt16LE(6, optional + 40);
    image.writeUInt16LE(0, optional + 42);
    image.writeUInt16LE(0, optional + 44);
    image.writeUInt16LE(0, optional + 46);
    image.writeUInt16LE(6, optional + 48);
    image.writeUInt16LE(0, optional + 50);
    image.writeUInt32LE(0, optional + 52);
    image.writeUInt32LE(imageSize, optional + 56);
    image.writeUInt32LE(headersSize, optional + 60);
    image.writeUInt32LE(0, optional + 64);
    image.writeUInt16LE(3, optional + 68);
    image.writeUInt16LE(0, optional + 70);
    image.writeBigUInt64LE(options.stackReserve ?? 0x100000n, optional + 72);
    image.writeBigUInt64LE(options.stackCommit ?? 0x1000n, optional + 80);
    image.writeBigUInt64LE(0x100000n, optional + 88);
    image.writeBigUInt64LE(0x1000n, optional + 96);
    image.writeUInt32LE(0, optional + 104);
    image.writeUInt32LE(16, optional + 108);
    image.writeUInt32LE(0, optional + 112);
    image.writeUInt32LE(16, optional + 116);
  } else {
    writePointer(image, optional + 28, target.imageBase, 'x86');
    image.writeUInt32LE(sectionAlignment, optional + 32);
    image.writeUInt32LE(fileAlignment, optional + 36);
    image.writeUInt16LE(6, optional + 40);
    image.writeUInt16LE(0, optional + 42);
    image.writeUInt16LE(0, optional + 44);
    image.writeUInt16LE(0, optional + 46);
    image.writeUInt16LE(6, optional + 48);
    image.writeUInt16LE(0, optional + 50);
    image.writeUInt32LE(0, optional + 52);
    image.writeUInt32LE(imageSize, optional + 56);
    image.writeUInt32LE(headersSize, optional + 60);
    image.writeUInt32LE(0, optional + 64);
    image.writeUInt16LE(3, optional + 68);
    image.writeUInt16LE(0, optional + 70);
    image.writeUInt32LE(0x100000, optional + 76);
    image.writeUInt32LE(0x1000, optional + 80);
    image.writeUInt32LE(0x100000, optional + 84);
    image.writeUInt32LE(0x1000, optional + 88);
    image.writeUInt32LE(0, optional + 92);
    image.writeUInt32LE(16, optional + 96);
  }

  const section = peOffset + 24 + optionalSize;
  image.write('.text', section, 'ascii');
  image.writeUInt32LE(options.code.length, section + 8);
  image.writeUInt32LE(codeRva, section + 12);
  image.writeUInt32LE(codeSize, section + 16);
  image.writeUInt32LE(codeRawOffset, section + 20);
  image.writeUInt32LE(0, section + 24);
  image.writeUInt32LE(0, section + 28);
  image.writeUInt16LE(0, section + 32);
  image.writeUInt16LE(0, section + 34);
  image.writeUInt32LE(0x60000020, section + 36);

  options.code.copy(image, codeRawOffset);
  return image;
}
