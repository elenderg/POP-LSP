/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from 'node:assert/strict';
import { convertToWindows1252 } from '../windows1252';

suite('Windows-1252 conversion', () => {
  test('preserves Portuguese text and Windows-1252 punctuation', () => {
    const source = 'Ação €';
    const result = convertToWindows1252(source, 'replace');

    assert.equal(result.text, source);
    assert.equal(result.unrepresentableCount, 0);
    assert.equal(
      new TextDecoder('windows-1252').decode(result.bytes),
      source
    );
  });

  test('removes or replaces unrepresentable characters as selected', () => {
    const source = 'A🙂B';
    const removed = convertToWindows1252(source, 'remove');
    const replaced = convertToWindows1252(source, 'replace');

    assert.equal(removed.text, 'AB');
    assert.equal(removed.unrepresentableCount, 1);
    assert.equal(replaced.text, 'A?B');
    assert.equal(replaced.unrepresentableCount, 1);
    assert.equal(
      new TextDecoder('windows-1252').decode(replaced.bytes),
      'A?B'
    );
  });
});
