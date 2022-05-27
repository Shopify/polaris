const {execSync} = require('child_process');
const {resolve} = require('path');

const root = resolve(__dirname, '..');
const run = (cmd) => execSync(cmd, {stdio: 'inherit', cwd: root});

// Generate SCSS media queries in `src/styles` for internal use
run(`yarn gen-media-queries`);

run('yarn run tsc -b');

// Run Sk build to generate everything
run(`yarn run rollup -c`);

run('yarn run downlevel-dts "./build/ts/latest" "./build/ts/3.4"');

run('yarn run copyfiles "./src/**/*.md" "./build/docs" --up=1');

run('yarn run downlevel-dts "build/ts/latest" "build/ts/3.4"');

run('yarn run copyfiles "./src/**/*.md" "./build/docs" --up=1');

// Run build validation tests to ensure build content is as we expect
run(`node scripts/build-validate.js`);
