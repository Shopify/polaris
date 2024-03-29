const assert = require('assert').strict;
const fs = require('fs');

const globby = require('globby');

const packageJSON = require('../package.json');

// Validation to assert the output of the build.

validateStandardBuild();
validateEsNextBuild();
validateAncillaryOutput();
validateVersionReplacement();

function validateStandardBuild() {
  // Standard build
  assert.ok(fs.existsSync('./build/cjs/index.js'));
  assert.ok(fs.existsSync('./build/esm/index.js'));
  assert.ok(fs.existsSync('./build/esm/styles.css'));

  // Assert it uses named exports rather than properties from the React default
  // export to help tree-shaking.
  // React.createElement and React.Fragment are the allowed exceptions
  const files = globby.sync('./build/cjs/**/*.js');
  assert.notStrictEqual(files.length, 0);
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

  assert.deepStrictEqual(filesContainingUnwantedReactUsage, []);

  // Standard build css contains namespaced classes
  const cssContent = fs.readFileSync('./build/esm/styles.css', 'utf-8');
  assert.ok(cssContent.includes('.Polaris-Avatar{'));
  assert.ok(cssContent.includes('.Polaris-BulkActions__BulkActionButton{'));
  assert.ok(cssContent.includes('@keyframes p-motion-keyframes-bounce{'));
  assert.ok(
    cssContent.includes(
      '--p-motion-keyframes-bounce:p-motion-keyframes-bounce;',
    ),
  );
}

function validateEsNextBuild() {
  // ESnext build
  assert.ok(fs.existsSync('./build/esnext/index.esnext'));
  assert.ok(fs.existsSync('./build/esnext/components/Avatar/Avatar.esnext'));
  assert.ok(fs.existsSync('./build/esnext/components/Avatar/Avatar.out.css'));
  assert.ok(
    fs.existsSync('./build/esnext/components/AppProvider/global.out.css'),
  );

  // ESnext build css contains namespaced classes, and
  const cssContent = fs.readFileSync(
    './build/esnext/components/Avatar/Avatar.out.css',
    'utf-8',
  );
  const cssKeyframesContent = fs.readFileSync(
    './build/esnext/components/AppProvider/global.out.css',
    'utf-8',
  );
  assert.ok(cssContent.includes('.Polaris-Avatar_z763p{'));
  assert.ok(
    cssKeyframesContent.includes('@keyframes p-motion-keyframes-spin{'),
  );
  assert.ok(
    cssKeyframesContent.includes(
      '--p-motion-keyframes-spin:p-motion-keyframes-spin;',
    ),
  );

  const jsContent = fs.readFileSync(
    './build/esnext/components/Avatar/Avatar.css.esnext',
    'utf-8',
  );

  assert.ok(jsContent.includes("import './Avatar.out.css';"));
  assert.ok(jsContent.includes('"Avatar": "Polaris-Avatar_z763p"'));
  assert.ok(jsContent.includes('"hidden": "Polaris-Avatar--hidden_riqie"'));
}

function validateAncillaryOutput() {
  assert.ok(fs.existsSync('./build/ts/src/index.d.ts'));
}

function validateVersionReplacement() {
  const files = globby.sync('./build/**/*.{js,mjs,esnext,css}');

  assert.notStrictEqual(files.length, 0);

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

  assert.strictEqual(fileBuckets.includesTemplateString.length, 0);

  assert.deepStrictEqual(fileBuckets.includesVersion, [
    './build/esm/styles.css',
    './build/esnext/components/AppProvider/global.out.css',
  ]);
}
