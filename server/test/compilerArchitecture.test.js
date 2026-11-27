const assert = require('node:assert/strict');
const test = require('node:test');
const {
  getWindowsTarget,
  parseWindowsTarget
} = require('../out/compilerArchitecture.js');
const { buildPeImage } = require('../out/peImage.js');
const {
  movRaxImm64,
  subRsp32,
  x64Prologue,
  x64Epilogue,
  x64ExternalCallSetup,
  x64ExternalCallCleanup,
  x64MoveRaxFromAddressMemory,
  x64MoveAddressFromRax,
  x64SubRaxImm32,
  x64AddRaxRbx,
  x64SubRaxRbx,
  x64ImulRaxRbx
} = require('../out/x64Encoder.js');

test('selects x86 and x64 targets without changing the x86 number type', () => {
  assert.equal(parseWindowsTarget('x86'), 'x86');
  assert.equal(parseWindowsTarget('amd64'), 'x64');
  assert.equal(getWindowsTarget('x64').pointerSize, 8);
  assert.equal(getWindowsTarget('x64').numberSize, 4);
  assert.equal(getWindowsTarget('x86').pointerSize, 4);
});

test('builds a valid PE32+ image header for AMD64', () => {
  const code = movRaxImm64(0x1234567890abcdefn);
  const image = buildPeImage({ architecture: 'x64', code, entryPointOffset: 0 });

  assert.equal(image.readUInt16LE(0), 0x5a4d);
  const pe = image.readUInt32LE(0x3c);
  assert.equal(image.readUInt32LE(pe), 0x4550);
  assert.equal(image.readUInt16LE(pe + 4), 0x8664);
  assert.equal(image.readUInt16LE(pe + 6), 1);
  assert.equal(image.readUInt16LE(pe + 20), 0xf0);

  const optional = pe + 24;
  assert.equal(image.readUInt16LE(optional), 0x20b);
  assert.equal(image.readBigUInt64LE(optional + 24), 0x140000000n);
  assert.equal(image.readUInt16LE(optional + 68), 3);
  assert.equal(image.readUInt32LE(optional + 108), 16);
  assert.equal(image.readUInt16LE(pe + 22), 0x22);
});

test('keeps PE32 magic and 32-bit image base for x86', () => {
  const image = buildPeImage({
    architecture: 'x86',
    code: Buffer.from([0xc3]),
    entryPointOffset: 0
  });
  const pe = image.readUInt32LE(0x3c);
  const optional = pe + 24;
  assert.equal(image.readUInt16LE(pe + 4), 0x14c);
  assert.equal(image.readUInt16LE(optional), 0x10b);
  assert.equal(image.readUInt32LE(optional + 28), 0x400000);
  assert.equal(image.readUInt32LE(optional + 72), 0x100000);
  assert.equal(image.readUInt32LE(optional + 76), 0x1000);
  assert.equal(image.readUInt32LE(optional + 92), 16);
  assert.equal(image.readUInt32LE(optional + 104), 0);
});

test('builds PE32+ imports and patches a RIP-relative IAT call', () => {
  const code = Buffer.from([0x31, 0xc9, 0xff, 0x15, 0, 0, 0, 0, 0x0f, 0x0b]);
  const image = buildPeImage({
    architecture: 'x64',
    code,
    entryPointOffset: 0,
    imports: [{ dll: 'kernel32.dll', function: 'ExitProcess' }],
    importCallSites: [{ offset: 2, dll: 'KERNEL32.DLL', function: 'ExitProcess' }]
  });
  const pe = image.readUInt32LE(0x3c);
  const optional = pe + 24;
  const sectionHeaders = optional + 0xf0;
  const textSection = sectionHeaders;
  const importSection = sectionHeaders + 40;
  const textRva = image.readUInt32LE(textSection + 12);
  const textRawOffset = image.readUInt32LE(textSection + 20);
  const importRva = image.readUInt32LE(importSection + 12);
  const importRawOffset = image.readUInt32LE(importSection + 20);
  const importDirectory = optional + 120;
  const iatDirectory = optional + 208;
  const lookupRva = image.readUInt32LE(importRawOffset);
  const dllNameRva = image.readUInt32LE(importRawOffset + 12);
  const iatRva = image.readUInt32LE(importRawOffset + 16);
  const nameRva = Number(image.readBigUInt64LE(importRawOffset + lookupRva - importRva));
  const importNameOffset = importRawOffset + nameRva - importRva;
  const expectedDisplacement = iatRva - (textRva + 2 + 6);

  assert.equal(image.readUInt16LE(pe + 6), 2);
  assert.equal(image.readUInt32LE(importDirectory), importRva);
  assert.equal(image.readUInt32LE(importDirectory + 4), 40);
  assert.equal(image.readUInt32LE(iatDirectory), iatRva);
  assert.equal(image.readUInt32LE(iatDirectory + 4), 16);
  assert.equal(image.readUInt32LE(textRawOffset + 4), expectedDisplacement);
  assert.equal(image.readBigUInt64LE(importRawOffset + lookupRva - importRva),
    image.readBigUInt64LE(importRawOffset + iatRva - importRva));
  assert.equal(image.readUInt16LE(importNameOffset), 0);
  assert.equal(image.toString('ascii', importNameOffset + 2, importNameOffset + 13), 'ExitProcess');
  assert.equal(image.toString('ascii', importRawOffset + dllNameRva - importRva, importRawOffset + dllNameRva - importRva + 12),
    'kernel32.dll');
});

test('builds PE32 imports and patches an absolute IAT call without changing x86 headers', () => {
  const code = Buffer.from([0x6a, 0x00, 0xff, 0x15, 0, 0, 0, 0]);
  const image = buildPeImage({
    architecture: 'x86',
    code,
    entryPointOffset: 0,
    imports: [{ dll: 'kernel32.dll', function: 'ExitProcess' }],
    importCallSites: [{ offset: 2, dll: 'kernel32.dll', function: 'ExitProcess' }]
  });
  const pe = image.readUInt32LE(0x3c);
  const optional = pe + 24;
  const sectionHeaders = optional + 0xe0;
  const textRawOffset = image.readUInt32LE(sectionHeaders + 20);
  const importSection = sectionHeaders + 40;
  const importRva = image.readUInt32LE(importSection + 12);
  const importRawOffset = image.readUInt32LE(importSection + 20);
  const iatRva = image.readUInt32LE(importRawOffset + 16);
  const iatVa = image.readUInt32LE(textRawOffset + 4);

  assert.equal(image.readUInt16LE(pe + 4), 0x14c);
  assert.equal(image.readUInt16LE(optional), 0x10b);
  assert.equal(image.readUInt32LE(optional + 24), importRva);
  assert.equal(image.readUInt32LE(optional + 104), importRva);
  assert.equal(iatVa, Number(getWindowsTarget('x86').imageBase) + iatRva);
});

test('rejects import call sites that do not refer to an imported function', () => {
  assert.throws(() => buildPeImage({
    architecture: 'x64',
    code: Buffer.from([0xff, 0x15, 0, 0, 0, 0]),
    entryPointOffset: 0,
    imports: [{ dll: 'kernel32.dll', function: 'ExitProcess' }],
    importCallSites: [{ offset: 0, dll: 'kernel32.dll', function: 'GetLastError' }]
  }), /no matching import/);
});

test('encodes a Windows x64 stack adjustment and 64-bit move', () => {
  assert.deepEqual(subRsp32(40), Buffer.from([0x48, 0x83, 0xec, 40]));
  assert.deepEqual(movRaxImm64(0x1122334455667788n),
    Buffer.from([0x48, 0xb8, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11]));
});

test('encodes x64 frame, Windows external-call setup, and 64-bit operations', () => {
  assert.deepEqual(x64Prologue(24), Buffer.from([
    0x55, 0x48, 0x89, 0xe5, 0x48, 0x81, 0xec, 0x20, 0x00, 0x00, 0x00
  ]));
  assert.deepEqual(x64Epilogue(), Buffer.from([
    0x48, 0x89, 0xec, 0x5d, 0xc3
  ]));
  assert.deepEqual(x64ExternalCallSetup(4).subarray(0, 4),
    Buffer.from([0x48, 0x83, 0xec, 0x20]));
  assert.equal(x64ExternalCallSetup(4).length, 36);
  assert.deepEqual(x64ExternalCallSetup(5), Buffer.from([
    0x48, 0x83, 0xec, 0x28,
    0x48, 0x8b, 0x84, 0x24, 0x48, 0, 0, 0,
    0x48, 0x89, 0x84, 0x24, 0x20, 0, 0, 0,
    0x48, 0x8b, 0x8c, 0x24, 0x28, 0, 0, 0,
    0x48, 0x8b, 0x94, 0x24, 0x30, 0, 0, 0,
    0x4c, 0x8b, 0x84, 0x24, 0x38, 0, 0, 0,
    0x4c, 0x8b, 0x8c, 0x24, 0x40, 0, 0, 0
  ]));
  assert.deepEqual(x64ExternalCallCleanup(5), Buffer.from([0x48, 0x83, 0xc4, 0x50]));
  const sevenArgumentSetup = x64ExternalCallSetup(7);
  assert.deepEqual(sevenArgumentSetup.subarray(0, 4), Buffer.from([0x48, 0x83, 0xec, 0x38]));
  assert.deepEqual(sevenArgumentSetup.subarray(36, 52), Buffer.from([
    0x48, 0x8b, 0x84, 0x24, 0x68, 0, 0, 0,
    0x48, 0x89, 0x84, 0x24, 0x30, 0, 0, 0
  ]));
  assert.deepEqual(x64ExternalCallCleanup(7), Buffer.from([0x48, 0x83, 0xc4, 0x70]));
  assert.deepEqual(x64ExternalCallSetup(1).subarray(0, 4),
    Buffer.from([0x48, 0x83, 0xec, 0x28]));
  assert.deepEqual(x64ExternalCallCleanup(1), Buffer.from([0x48, 0x83, 0xc4, 0x30]));
  assert.deepEqual(x64MoveRaxFromAddressMemory(), Buffer.from([0x48, 0x8b, 0x02]));
  assert.deepEqual(x64MoveAddressFromRax(), Buffer.from([0x48, 0x89, 0x02]));
  assert.deepEqual(x64SubRaxImm32(-129), Buffer.from([0x48, 0x2d, 0x7f, 0xff, 0xff, 0xff]));
  assert.deepEqual(x64AddRaxRbx(), Buffer.from([0x48, 0x01, 0xd8]));
  assert.deepEqual(x64SubRaxRbx(), Buffer.from([0x48, 0x29, 0xd8]));
  assert.deepEqual(x64ImulRaxRbx(), Buffer.from([0x48, 0x0f, 0xaf, 0xc3]));
});
