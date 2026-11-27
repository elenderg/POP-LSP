export function movRaxImm64(value: bigint): Buffer {
  if (value < 0n || value > 0xffffffffffffffffn) {
    throw new RangeError('Immediate value does not fit in an unsigned 64-bit register');
  }
  const result = Buffer.alloc(10);
  result[0] = 0x48;
  result[1] = 0xb8;
  result.writeBigUInt64LE(value, 2);
  return result;
}

export function subRsp32(shadowAndLocals: number): Buffer {
  if (shadowAndLocals < 0 || shadowAndLocals > 0x7fffffffn) {
    throw new RangeError('Stack adjustment is outside the signed 32-bit range');
  }
  if (shadowAndLocals === 0) {
    return Buffer.alloc(0);
  }
  if (shadowAndLocals <= 127) {
    return Buffer.from([0x48, 0x83, 0xec, shadowAndLocals]);
  }
  const result = Buffer.alloc(7);
  result[0] = 0x48;
  result[1] = 0x81;
  result[2] = 0xec;
  result.writeInt32LE(shadowAndLocals, 3);
  return result;
}

export function callRipRelative(displacement: number): Buffer {
  if (displacement < -0x80000000 || displacement > 0x7fffffffn) {
    throw new RangeError('Relative call displacement is outside the 32-bit range');
  }
  const result = Buffer.alloc(5);
  result[0] = 0xe8;
  result.writeInt32LE(displacement, 1);
  return result;
}

export function x64Prologue(localBytes: number): Buffer {
  if (!Number.isInteger(localBytes) || localBytes < 0) {
    throw new RangeError('Local area size must be a non-negative integer');
  }
  const aligned = Math.ceil(localBytes / 16) * 16;
  if (aligned === 0) {
    return Buffer.from([0x55, 0x48, 0x89, 0xe5]);
  }
  const result = Buffer.alloc(11);
  result.set([0x55, 0x48, 0x89, 0xe5, 0x48, 0x81, 0xec], 0);
  result.writeUInt32LE(aligned, 7);
  return result;
}

export function x64Epilogue(parameterBytes: number): Buffer {
  if (!Number.isInteger(parameterBytes) || parameterBytes < 0 || parameterBytes > 0xffff) {
    throw new RangeError('Parameter area size is outside the RET immediate range');
  }
  if (parameterBytes === 0) {
    return Buffer.from([0x48, 0x89, 0xec, 0x5d, 0xc3]);
  }
  const result = Buffer.alloc(7);
  result.set([0x48, 0x89, 0xec, 0x5d, 0xc2], 0);
  result.writeUInt16LE(parameterBytes, 5);
  return result;
}

export function x64ExternalCallSetup(argumentCount: number): Buffer {
  if (!Number.isInteger(argumentCount) || argumentCount < 0) {
    throw new RangeError('Argument count must be a non-negative integer');
  }
  const instructions: number[] = [0x48, 0x83, 0xec, 0x20];
  if (argumentCount >= 1) instructions.push(0x48, 0x8b, 0x4c, 0x24, 0x20);
  if (argumentCount >= 2) instructions.push(0x48, 0x8b, 0x54, 0x24, 0x28);
  if (argumentCount >= 3) instructions.push(0x4c, 0x8b, 0x44, 0x24, 0x30);
  if (argumentCount >= 4) instructions.push(0x4c, 0x8b, 0x4c, 0x24, 0x38);
  return Buffer.from(instructions);
}

export function x64ExternalCallCleanup(argumentCount: number): Buffer {
  if (!Number.isInteger(argumentCount) || argumentCount < 0) {
    throw new RangeError('Argument count must be a non-negative integer');
  }
  const result = Buffer.alloc(7);
  result.set([0x48, 0x83, 0xc4, 0x20], 0);
  const pushedBytes = argumentCount * 8;
  if (pushedBytes === 0) {
    return result.subarray(0, 4);
  }
  const cleanup = Buffer.alloc(7);
  cleanup.set([0x48, 0x81, 0xc4]);
  cleanup.writeUInt32LE(pushedBytes, 3);
  return Buffer.concat([result.subarray(0, 4), cleanup]);
}

export function x64MoveRaxFromAddressMemory(): Buffer {
  return Buffer.from([0x48, 0x8b, 0x02]);
}

export function x64MoveAddressFromRax(): Buffer {
  return Buffer.from([0x48, 0x89, 0x02]);
}

export function x64PushQwordFromAddress(): Buffer {
  return Buffer.from([0x48, 0xff, 0x32]);
}

export function x64PushRax(): Buffer {
  return Buffer.from([0x50]);
}

export function x64AddRaxImm32(value: number): Buffer {
  if (!Number.isInteger(value) || value < -0x80000000 || value > 0x7fffffff) {
    throw new RangeError('Immediate value is outside signed 32-bit range');
  }
  if (value >= -128 && value <= 127) {
    return Buffer.from([0x48, 0x83, 0xc0, value & 0xff]);
  }
  const result = Buffer.alloc(7);
  result.set([0x48, 0x05]);
  result.writeInt32LE(value, 2);
  return result;
}

export function x64SubRaxImm32(value: number): Buffer {
  if (!Number.isInteger(value) || value < -0x80000000 || value > 0x7fffffff) {
    throw new RangeError('Immediate value is outside signed 32-bit range');
  }
  if (value >= -128 && value <= 127) {
    return Buffer.from([0x48, 0x83, 0xe8, value & 0xff]);
  }
  const result = Buffer.alloc(6);
  result.set([0x48, 0x2d]);
  result.writeUInt32LE(value, 2);
  return result;
}

export function x64AddRaxRbx(): Buffer {
  return Buffer.from([0x48, 0x01, 0xd8]);
}

export function x64SubRaxRbx(): Buffer {
  return Buffer.from([0x48, 0x29, 0xd8]);
}

export function x64ImulRaxRbx(): Buffer {
  return Buffer.from([0x48, 0x0f, 0xaf, 0xc3]);
}

export function x64CompareRaxRbx(): Buffer {
  return Buffer.from([0x48, 0x39, 0xd8]);
}
