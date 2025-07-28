const { execSync } = require('child_process');
const path = require('path');

const isWindows = process.platform === 'win32';

const CODE_TESTS_PATH = path.resolve(__dirname, 'client', 'out', 'test');
const CODE_TESTS_WORKSPACE = path.resolve(__dirname, 'client', 'testFixture');

process.env.CODE_TESTS_PATH = CODE_TESTS_PATH;
process.env.CODE_TESTS_WORKSPACE = CODE_TESTS_WORKSPACE;

const nodeCommand = isWindows
  ? `node "${path.join(CODE_TESTS_PATH, 'runTest.js')}"`
  : `node "${path.join(CODE_TESTS_PATH, 'runTest')}"`;

console.log(`Running tests with:
CODE_TESTS_PATH=${CODE_TESTS_PATH}
CODE_TESTS_WORKSPACE=${CODE_TESTS_WORKSPACE}`);

execSync(nodeCommand, { stdio: 'inherit' });
