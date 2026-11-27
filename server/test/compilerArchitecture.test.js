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
  assert.deepEqual(x64Epilogue(24), Buffer.from([
    0x48, 0x89, 0xec, 0x5d, 0xc2, 0x18, 0x00
  ]));
  assert.deepEqual(x64ExternalCallSetup(4).subarray(0, 4),
    Buffer.from([0x48, 0x83, 0xec, 0x20]));
  assert.equal(x64ExternalCallSetup(4).length, 24);
  assert.equal(x64ExternalCallCleanup(2).length, 11);
  assert.deepEqual(x64MoveRaxFromAddressMemory(), Buffer.from([0x48, 0x8b, 0x02]));
  assert.deepEqual(x64MoveAddressFromRax(), Buffer.from([0x48, 0x89, 0x02]));
  assert.deepEqual(x64AddRaxRbx(), Buffer.from([0x48, 0x01, 0xd8]));
  assert.deepEqual(x64SubRaxRbx(), Buffer.from([0x48, 0x29, 0xd8]));
  assert.deepEqual(x64ImulRaxRbx(), Buffer.from([0x48, 0x0f, 0xaf, 0xc3]));
});
