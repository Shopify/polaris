const {execSync} = require('child_process');
const {resolve} = require('path');

const root = resolve(__dirname, '..');
const run = (cmd) => execSync(cmd, {stdio: 'inherit', cwd: root});

// Pull polaris-tokens into the styles folder
run(`yarn run copy-polaris-tokens`);

// Run a TypeScript build to generate type definitions (but no JS)
run(`yarn run tsc -p tsconfig.build.json`);

// Downlevel type declarations to support consuming apps that use older versions
// of typescript
run(`yarn run downlevel-dts types/latest types/3.4`);

// Run a Rollup build to generate JS and styles
run(`yarn run rollup -c config/rollup/rollup.config.js`);

// Copy documentation into the docs folder
run(`yarn run copyfiles './src/**/*.md' './docs' --up=1`);
