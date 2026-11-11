const assert = require('node:assert/strict');
const test = require('node:test');
const {
  isCurrentDocumentSnapshot
} = require('../out/documentDiagnostics.js');

test('accepts diagnostics only when captured, current, and indexed versions match', () => {
  assert.equal(isCurrentDocumentSnapshot(7, 7, 7), true);
  assert.equal(isCurrentDocumentSnapshot(6, 7, 7), false);
  assert.equal(isCurrentDocumentSnapshot(7, 7, 6), false);
  assert.equal(isCurrentDocumentSnapshot(7, undefined, 7), false);
  assert.equal(isCurrentDocumentSnapshot(7, 7, undefined), false);
});
