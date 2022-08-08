// eslint-disable-next-line node/no-unsupported-features/node-builtins
import assert from 'assert';
import fs from 'fs';

import glob from 'glob';

import packageJSON from '../package.json' assert {type: 'json'};

const assertStrict = assert.strict;

// Validation to assert the output of the build.

validateStandardBuild();
validateEsNextBuild();
validateAncillaryOutput();
validateVersionReplacement();

function validateStandardBuild() {
  // Standard build
  assertStrict.ok(fs.existsSync('./build/cjs/index.js'));
  assertStrict.ok(fs.existsSync('./build/esm/index.js'));
  assertStrict.ok(fs.existsSync('./build/esm/styles.css'));

  // Assert it uses named exports rather than properties from the React default
  // export to help tree-shaking.
  // React.createElement and React.Fragment are the allowed exceptions
  const files = glob.sync('./build/cjs/**/*.js');
  assertStrict.notStrictEqual(files.length, 0);
  const filesContainingUnwantedReactUsage = [];
  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');

    const unwantedReactUsageMatches =
      content.match(
        /React__default\['default'\]\.(?!createElement|Fragment)[A-Za-z0-9]+/g,
      ) || [];

    if (unwantedReactUsageMatches.length) {
      filesContainingUnwantedReactUsage.push(file);
    }
  });

  assertStrict.deepStrictEqual(filesContainingUnwantedReactUsage, []);

  // Standard build css contains namespaced classes
  const cssContent = fs.readFileSync('./build/esm/styles.css', 'utf-8');
  assertStrict.ok(cssContent.includes('.Polaris-Avatar {'));
  assertStrict.ok(
    cssContent.includes('.Polaris-BulkActions__BulkActionButton {'),
  );
  assertStrict.ok(cssContent.includes('@keyframes p-keyframes-bounce {'));
  assertStrict.ok(
    cssContent.includes('--p-keyframes-bounce:p-keyframes-bounce;'),
  );
}

function validateEsNextBuild() {
  // ESnext build
  assertStrict.ok(fs.existsSync('./build/esnext/index.esnext'));
  assertStrict.ok(
    fs.existsSync('./build/esnext/components/Avatar/Avatar.esnext'),
  );
  assertStrict.ok(fs.existsSync('./build/esnext/components/Avatar/Avatar.css'));
  assertStrict.ok(
    fs.existsSync(
      './build/esnext/components/CustomProperties/CustomProperties.css',
    ),
  );

  // ESnext build css contains namespaced classes, and
  const cssContent = fs.readFileSync(
    './build/esnext/components/Avatar/Avatar.css',
    'utf-8',
  );
  const cssKeyframesContent = fs.readFileSync(
    './build/esnext/components/CustomProperties/CustomProperties.css',
    'utf-8',
  );
  assertStrict.ok(cssContent.includes('.Polaris-Avatar_z763p {'));
  assertStrict.ok(
    cssKeyframesContent.includes('@keyframes p-keyframes-spin {'),
  );
  assertStrict.ok(
    cssKeyframesContent.includes('--p-keyframes-spin:p-keyframes-spin;'),
  );

  const jsContent = fs.readFileSync(
    './build/esnext/components/Avatar/Avatar.scss.esnext',
    'utf-8',
  );

  assertStrict.ok(jsContent.includes("import './Avatar.css';"));
  assertStrict.ok(jsContent.includes('"Avatar": "Polaris-Avatar_z763p"'));
  assertStrict.ok(
    jsContent.includes('"hidden": "Polaris-Avatar--hidden_riqie"'),
  );
}

function validateAncillaryOutput() {
  assertStrict.ok(fs.existsSync('./build/ts/latest/src/index.d.ts'));
  // Downleveled for consumers on older TypeScript versions
  assertStrict.ok(fs.existsSync('./build/ts/3.4/src/index.d.ts'));
}

function validateVersionReplacement() {
  const files = glob.sync('./build/**/*.{js,mjs,esnext,css}');

  assertStrict.notStrictEqual(files.length, 0);

  const fileBuckets = {
    includesTemplateString: [],
    includesVersion: [],
  };

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');

    if (content.includes('POLARIS_VERSION')) {
      fileBuckets.includesTemplateString.push(file);
    }

    if (content.includes(packageJSON.version)) {
      fileBuckets.includesVersion.push(file);
    }
  });

  assertStrict.strictEqual(fileBuckets.includesTemplateString.length, 0);

  assertStrict.deepStrictEqual(fileBuckets.includesVersion, [
    './build/cjs/configure.js',
    './build/esm/configure.js',
    './build/esm/styles.css',
    './build/esnext/components/AppProvider/AppProvider.css',
    './build/esnext/configure.esnext',
  ]);
}
