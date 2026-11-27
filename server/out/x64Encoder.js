"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movRaxImm64 = movRaxImm64;
exports.subRsp32 = subRsp32;
exports.callRipRelative = callRipRelative;
exports.x64Prologue = x64Prologue;
exports.x64Epilogue = x64Epilogue;
exports.x64ExternalCallSetup = x64ExternalCallSetup;
exports.x64ExternalCallCleanup = x64ExternalCallCleanup;
exports.x64MoveRaxFromAddressMemory = x64MoveRaxFromAddressMemory;
exports.x64MoveAddressFromRax = x64MoveAddressFromRax;
exports.x64PushQwordFromAddress = x64PushQwordFromAddress;
exports.x64PushRax = x64PushRax;
exports.x64AddRaxImm32 = x64AddRaxImm32;
exports.x64SubRaxImm32 = x64SubRaxImm32;
exports.x64AddRaxRbx = x64AddRaxRbx;
exports.x64SubRaxRbx = x64SubRaxRbx;
exports.x64ImulRaxRbx = x64ImulRaxRbx;
exports.x64CompareRaxRbx = x64CompareRaxRbx;
function movRaxImm64(value) {
    if (value < 0n || value > 0xffffffffffffffffn) {
        throw new RangeError('Immediate value does not fit in an unsigned 64-bit register');
    }
    const result = Buffer.alloc(10);
    result[0] = 0x48;
    result[1] = 0xb8;
    result.writeBigUInt64LE(value, 2);
    return result;
}
function subRsp32(shadowAndLocals) {
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
function callRipRelative(displacement) {
    if (displacement < -0x80000000 || displacement > 0x7fffffffn) {
        throw new RangeError('Relative call displacement is outside the 32-bit range');
    }
    const result = Buffer.alloc(5);
    result[0] = 0xe8;
    result.writeInt32LE(displacement, 1);
    return result;
}
function x64Prologue(localBytes) {
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
function x64Epilogue(parameterBytes) {
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
function x64ExternalCallSetup(argumentCount) {
    if (!Number.isInteger(argumentCount) || argumentCount < 0) {
        throw new RangeError('Argument count must be a non-negative integer');
    }
    const instructions = [0x48, 0x83, 0xec, 0x20];
    if (argumentCount >= 1)
        instructions.push(0x48, 0x8b, 0x4c, 0x24, 0x20);
    if (argumentCount >= 2)
        instructions.push(0x48, 0x8b, 0x54, 0x24, 0x28);
    if (argumentCount >= 3)
        instructions.push(0x4c, 0x8b, 0x44, 0x24, 0x30);
    if (argumentCount >= 4)
        instructions.push(0x4c, 0x8b, 0x4c, 0x24, 0x38);
    return Buffer.from(instructions);
}
function x64ExternalCallCleanup(argumentCount) {
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
function x64MoveRaxFromAddressMemory() {
    return Buffer.from([0x48, 0x8b, 0x02]);
}
function x64MoveAddressFromRax() {
    return Buffer.from([0x48, 0x89, 0x02]);
}
function x64PushQwordFromAddress() {
    return Buffer.from([0x48, 0xff, 0x32]);
}
function x64PushRax() {
    return Buffer.from([0x50]);
}
function x64AddRaxImm32(value) {
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
function x64SubRaxImm32(value) {
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
function x64AddRaxRbx() {
    return Buffer.from([0x48, 0x01, 0xd8]);
}
function x64SubRaxRbx() {
    return Buffer.from([0x48, 0x29, 0xd8]);
}
function x64ImulRaxRbx() {
    return Buffer.from([0x48, 0x0f, 0xaf, 0xc3]);
}
function x64CompareRaxRbx() {
    return Buffer.from([0x48, 0x39, 0xd8]);
}
//# sourceMappingURL=x64Encoder.js.map