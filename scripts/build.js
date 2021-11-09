const {execSync} = require('child_process');
const {resolve} = require('path');

const root = resolve(__dirname, '..');
const run = (cmd) => execSync(cmd, {stdio: 'inherit', cwd: root});

// Run Sk build to generate everything
run(`yarn run loom build`);

// Run build validation tests to ensure build content is as we expect
run(`node scripts/build-validate.js`);
