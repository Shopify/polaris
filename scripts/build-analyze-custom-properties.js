const {execSync} = require('child_process');
const {resolve: resolvePath} = require('path');
const {writeFileSync} = require('fs');

const root = resolvePath(__dirname, '..');
const tscBin = resolvePath(root, './node_modules/.bin/tsc');

const analyzeCustomPropertiesTsconfig = resolvePath(
  root,
  'scripts/analyze-custom-properties/tsconfig.json',
);
const partialBuildTsConfig = resolvePath(
  root,
  'scripts/analyze-custom-properties/tsconfig-partial-build.json',
);

const execOptions = {stdio: 'inherit'};

// eslint-disable-next-line no-console
console.log('🛠 Starting to build known custom properties...');

execSync(`${tscBin} --project ${analyzeCustomPropertiesTsconfig}`, execOptions);

execSync(`${tscBin} --project ${partialBuildTsConfig}`, execOptions);

const {
  nonDesignLangaugeCustomProperties,
  designLangaugeCustomProperties,
} = require('../build-internal/custom-properties-partial-build/src/utilities/custom-properties');

writeFileSync(
  resolvePath(root, 'build-internal/known-custom-properties.json'),
  JSON.stringify(
    [...designLangaugeCustomProperties, ...nonDesignLangaugeCustomProperties],
    null,
    2,
  ),
);

// eslint-disable-next-line no-console
console.log('🎊 Finishing building known custom properties.');
