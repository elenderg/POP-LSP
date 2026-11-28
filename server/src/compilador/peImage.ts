import { getWindowsTarget, WindowsTargetArchitecture } from './compilerArchitecture';

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

interface ImportFunctionLayout extends PeImport {
  nameOffset: number;
}

interface ImportGroupLayout {
  dll: string;
  functions: ImportFunctionLayout[];
  lookupTableOffset: number;
  addressTableOffset: number;
  dllNameOffset: number;
}

interface ImportSection {
  data: Buffer;
  directorySize: number;
  addressTableOffset: number;
  addressTableSize: number;
  addresses: Map<string, number>;
}

function alignUp(value: number, alignment: number): number {
  return Math.ceil(value / alignment) * alignment;
}

function importKey(dll: string, functionName: string): string {
  return `${dll.toLowerCase()}\0${functionName}`;
}

function encodeImportName(value: string, description: string): Buffer {
  if (!value || !/^[\x20-\x7e]+$/.test(value)) {
    throw new TypeError(`${description} must contain printable ASCII characters`);
  }
  return Buffer.from(value, 'ascii');
}

function buildImportSection(
  imports: PeImport[],
  sectionRva: number,
  architecture: WindowsTargetArchitecture
): ImportSection {
  const grouped = new Map<string, { dll: string; functions: string[] }>();
  for (const item of imports) {
    const dllBytes = encodeImportName(item.dll, 'Import DLL name');
    const functionBytes = encodeImportName(item.function, 'Import function name');
    const dllKey = item.dll.toLowerCase();
    let group = grouped.get(dllKey);
    if (!group) {
      group = { dll: item.dll, functions: [] };
      grouped.set(dllKey, group);
    }
    if (!group.functions.includes(item.function)) {
      group.functions.push(item.function);
    }
    if (dllBytes.length === 0 || functionBytes.length === 0) {
      throw new TypeError('Import names cannot be empty');
    }
  }

  const thunkSize = architecture === 'x64' ? 8 : 4;
  const groups: ImportGroupLayout[] = [...grouped.values()].map(group => ({
    dll: group.dll,
    functions: group.functions.map(functionName => ({ dll: group.dll, function: functionName, nameOffset: 0 })),
    lookupTableOffset: 0,
    addressTableOffset: 0,
    dllNameOffset: 0
  }));
  let cursor = (groups.length + 1) * 20;

  for (const group of groups) {
    group.lookupTableOffset = cursor;
    cursor += (group.functions.length + 1) * thunkSize;
  }
  for (const group of groups) {
    group.addressTableOffset = cursor;
    cursor += (group.functions.length + 1) * thunkSize;
  }
  for (const group of groups) {
    for (const fn of group.functions) {
      cursor = alignUp(cursor, 2);
      fn.nameOffset = cursor;
      cursor += 2 + encodeImportName(fn.function, 'Import function name').length + 1;
    }
  }
  for (const group of groups) {
    group.dllNameOffset = cursor;
    cursor += encodeImportName(group.dll, 'Import DLL name').length + 1;
  }

  const data = Buffer.alloc(cursor);
  const addresses = new Map<string, number>();
  for (let groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
    const group = groups[groupIndex];
    const descriptorOffset = groupIndex * 20;
    const lookupRva = sectionRva + group.lookupTableOffset;
    const addressRva = sectionRva + group.addressTableOffset;
    data.writeUInt32LE(lookupRva, descriptorOffset);
    data.writeUInt32LE(sectionRva + group.dllNameOffset, descriptorOffset + 12);
    data.writeUInt32LE(addressRva, descriptorOffset + 16);

    for (let functionIndex = 0; functionIndex < group.functions.length; functionIndex += 1) {
      const fn = group.functions[functionIndex];
      const nameRva = sectionRva + fn.nameOffset;
      const lookupOffset = group.lookupTableOffset + functionIndex * thunkSize;
      const addressOffset = group.addressTableOffset + functionIndex * thunkSize;
      if (architecture === 'x64') {
        data.writeBigUInt64LE(BigInt(nameRva), lookupOffset);
        data.writeBigUInt64LE(BigInt(nameRva), addressOffset);
      } else {
        data.writeUInt32LE(nameRva, lookupOffset);
        data.writeUInt32LE(nameRva, addressOffset);
      }

      data.writeUInt16LE(0, fn.nameOffset);
      encodeImportName(fn.function, 'Import function name').copy(data, fn.nameOffset + 2);
      data[fn.nameOffset + 2 + encodeImportName(fn.function, 'Import function name').length] = 0;
      addresses.set(importKey(group.dll, fn.function), addressRva + functionIndex * thunkSize);
    }

    encodeImportName(group.dll, 'Import DLL name').copy(data, group.dllNameOffset);
    data[group.dllNameOffset + encodeImportName(group.dll, 'Import DLL name').length] = 0;
  }

  const addressTableOffset = groups[0]?.addressTableOffset ?? 0;
  const addressTableSize = groups.reduce(
    (total, group) => total + (group.functions.length + 1) * thunkSize,
    0
  );
  return {
    data,
    directorySize: (groups.length + 1) * 20,
    addressTableOffset,
    addressTableSize,
    addresses
  };
}

function writeSectionHeader(
  image: Buffer,
  offset: number,
  name: string,
  virtualSize: number,
  virtualAddress: number,
  rawSize: number,
  rawAddress: number,
  characteristics: number
): void {
  image.write(name, offset, 'ascii');
  image.writeUInt32LE(virtualSize, offset + 8);
  image.writeUInt32LE(virtualAddress, offset + 12);
  image.writeUInt32LE(rawSize, offset + 16);
  image.writeUInt32LE(rawAddress, offset + 20);
  image.writeUInt32LE(0, offset + 24);
  image.writeUInt32LE(0, offset + 28);
  image.writeUInt16LE(0, offset + 32);
  image.writeUInt16LE(0, offset + 34);
  image.writeUInt32LE(characteristics, offset + 36);
}

export function buildPeImage(options: PeImageOptions): Buffer {
  const target = getWindowsTarget(options.architecture);
  if (
    options.entryPointOffset === undefined ||
    options.entryPointOffset < 0 ||
    options.entryPointOffset >= options.code.length
  ) {
    throw new RangeError('Entry point must point into the code section');
  }

  const imports = options.imports ?? [];
  const importCallSites = options.importCallSites ?? [];
  if (importCallSites.length > 0 && imports.length === 0) {
    throw new TypeError('Import call sites require at least one import');
  }

  const fileAlignment = 0x200;
  const sectionAlignment = 0x1000;
  const dosSize = 0x80;
  const optionalSize = target.architecture === 'x64' ? 0xf0 : 0xe0;
  const sectionCount = imports.length > 0 ? 2 : 1;
  const sectionHeadersOffset = dosSize + 4 + 20 + optionalSize;
  const headersSize = alignUp(sectionHeadersOffset + sectionCount * 40, fileAlignment);
  const codeRva = sectionAlignment;
  const codeRawOffset = headersSize;
  const codeRawSize = alignUp(options.code.length, fileAlignment);
  const idataRva = alignUp(codeRva + options.code.length, sectionAlignment);
  const importSection = imports.length > 0
    ? buildImportSection(imports, idataRva, target.architecture)
    : undefined;
  const idataRawOffset = codeRawOffset + codeRawSize;
  const idataRawSize = importSection ? alignUp(importSection.data.length, fileAlignment) : 0;
  const imageSize = alignUp(
    importSection ? idataRva + importSection.data.length : codeRva + options.code.length,
    sectionAlignment
  );
  const image = Buffer.alloc(idataRawOffset + idataRawSize);
  const code = Buffer.from(options.code);

  for (const callSite of importCallSites) {
    if (!Number.isInteger(callSite.offset) || callSite.offset < 0 || callSite.offset + 6 > code.length) {
      throw new RangeError('Import call site must point to a complete six-byte instruction in the code');
    }
    if (code[callSite.offset] !== 0xff || code[callSite.offset + 1] !== 0x15) {
      throw new TypeError('Import call site must point to a CALL [memory] instruction (FF 15)');
    }
    const addressRva = importSection?.addresses.get(importKey(callSite.dll, callSite.function));
    if (addressRva === undefined) {
      throw new TypeError(`Import call site has no matching import: ${callSite.dll}!${callSite.function}`);
    }
    if (target.architecture === 'x64') {
      const displacement = addressRva - (codeRva + callSite.offset + 6);
      if (displacement < -0x80000000 || displacement > 0x7fffffff) {
        throw new RangeError('Import address is outside the x64 RIP-relative displacement range');
      }
      code.writeInt32LE(displacement, callSite.offset + 2);
    } else {
      const address = target.imageBase + BigInt(addressRva);
      if (address > 0xffffffffn) {
        throw new RangeError('A 32-bit import address exceeds DWORD range');
      }
      code.writeUInt32LE(Number(address), callSite.offset + 2);
    }
  }

  image.writeUInt16LE(0x5a4d, 0);
  image.writeUInt32LE(dosSize, 0x3c);

  const peOffset = dosSize;
  image.writeUInt32LE(0x4550, peOffset);
  image.writeUInt16LE(target.machine, peOffset + 4);
  image.writeUInt16LE(sectionCount, peOffset + 6);
  image.writeUInt32LE(0, peOffset + 8);
  image.writeUInt32LE(0, peOffset + 12);
  image.writeUInt32LE(0, peOffset + 16);
  image.writeUInt16LE(optionalSize, peOffset + 20);
  image.writeUInt16LE(target.architecture === 'x64' ? 0x0022 : 0x0102, peOffset + 22);

  const optional = peOffset + 24;
  image.writeUInt16LE(target.peMagic, optional);
  image.writeUInt16LE(0, optional + 2);
  image.writeUInt32LE(codeRawSize, optional + 4);
  image.writeUInt32LE(idataRawSize, optional + 8);
  image.writeUInt32LE(0, optional + 12);
  image.writeUInt32LE(codeRva + options.entryPointOffset, optional + 16);
  image.writeUInt32LE(codeRva, optional + 20);

  const dataDirectoryOffset = target.architecture === 'x64' ? 112 : 96;
  if (target.architecture === 'x64') {
    image.writeBigUInt64LE(target.imageBase, optional + 24);
  } else {
    image.writeUInt32LE(importSection ? idataRva : 0, optional + 24);
    image.writeUInt32LE(Number(target.imageBase), optional + 28);
  }
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

  if (target.architecture === 'x64') {
    image.writeBigUInt64LE(options.stackReserve ?? 0x100000n, optional + 72);
    image.writeBigUInt64LE(options.stackCommit ?? 0x1000n, optional + 80);
    image.writeBigUInt64LE(0x100000n, optional + 88);
    image.writeBigUInt64LE(0x1000n, optional + 96);
    image.writeUInt32LE(0, optional + 104);
    image.writeUInt32LE(16, optional + 108);
  } else {
    image.writeUInt32LE(Number(options.stackReserve ?? 0x100000n), optional + 72);
    image.writeUInt32LE(Number(options.stackCommit ?? 0x1000n), optional + 76);
    image.writeUInt32LE(0x100000, optional + 80);
    image.writeUInt32LE(0x1000, optional + 84);
    image.writeUInt32LE(0, optional + 88);
    image.writeUInt32LE(16, optional + 92);
  }

  if (importSection) {
    const importDirectory = optional + dataDirectoryOffset + 8;
    const iatDirectory = optional + dataDirectoryOffset + 12 * 8;
    image.writeUInt32LE(idataRva, importDirectory);
    image.writeUInt32LE(importSection.directorySize, importDirectory + 4);
    image.writeUInt32LE(idataRva + importSection.addressTableOffset, iatDirectory);
    image.writeUInt32LE(importSection.addressTableSize, iatDirectory + 4);
  }

  const sectionHeaders = peOffset + 24 + optionalSize;
  writeSectionHeader(
    image,
    sectionHeaders,
    '.text',
    options.code.length,
    codeRva,
    codeRawSize,
    codeRawOffset,
    0x60000020
  );
  if (importSection) {
    writeSectionHeader(
      image,
      sectionHeaders + 40,
      '.idata',
      importSection.data.length,
      idataRva,
      idataRawSize,
      idataRawOffset,
      0xc0000040
    );
  }

  code.copy(image, codeRawOffset);
  importSection?.data.copy(image, idataRawOffset);
  return image;
}
