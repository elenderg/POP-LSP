"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const assert = require("node:assert/strict");
const windows1252_1 = require("../windows1252");
suite('Windows-1252 conversion', () => {
    test('preserves Portuguese text and Windows-1252 punctuation', () => {
        const source = 'Ação €';
        const result = (0, windows1252_1.convertToWindows1252)(source, 'replace');
        assert.equal(result.text, source);
        assert.equal(result.unrepresentableCount, 0);
        assert.equal(new TextDecoder('windows-1252').decode(result.bytes), source);
    });
    test('removes or replaces unrepresentable characters as selected', () => {
        const source = 'A🙂B';
        const removed = (0, windows1252_1.convertToWindows1252)(source, 'remove');
        const replaced = (0, windows1252_1.convertToWindows1252)(source, 'replace');
        assert.equal(removed.text, 'AB');
        assert.equal(removed.unrepresentableCount, 1);
        assert.equal(replaced.text, 'A?B');
        assert.equal(replaced.unrepresentableCount, 1);
        assert.equal(new TextDecoder('windows-1252').decode(replaced.bytes), 'A?B');
    });
});
//# sourceMappingURL=windows1252.test.js.map