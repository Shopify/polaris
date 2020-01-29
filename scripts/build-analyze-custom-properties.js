const {execSync} = require('child_process');
const {resolve: resolvePath} = require('path');
const {mkdirSync, writeFileSync} = require('fs');

const root = resolvePath(__dirname, '..');
const tscBin = resolvePath(root, './node_modules/.bin/tsc');
const scripts = resolvePath(root, 'scripts');
const build = resolvePath(root, 'build');
const analyzeCustomProperties = resolvePath(
  scripts,
  'analyze-custom-properties',
);
const analyzeCustomPropertiesTsconfig = resolvePath(
  analyzeCustomProperties,
  'tsconfig.json',
);
const customProperties = resolvePath(root, 'src/utilities/custom-properties');
const analyzeCustomPropertiesBuild = resolvePath(
  analyzeCustomProperties,
  'dist',
);
const customPropertiesBuild = resolvePath(build, 'custom-properties');
const knownProperties = resolvePath(root, 'build/known-custom-properties.json');

const execOptions = {
  stdio: 'inherit',
};

// eslint-disable-next-line no-console
console.log('🛠 Starting to build known custom properties...');

try {
  mkdirSync(analyzeCustomPropertiesBuild);
  // eslint-disable-next-line no-empty
} catch (_) {}

execSync(
  `${tscBin} --outDir ${analyzeCustomPropertiesBuild} --project ${analyzeCustomPropertiesTsconfig}`,
  execOptions,
);

execSync(
  `${tscBin} --outDir ${build} --project ${customProperties}`,
  execOptions,
);

const {
  nonDesignLangaugeCustomProperties,
  designLangaugeCustomProperties,
} = require(customPropertiesBuild);

writeFileSync(
  knownProperties,
  JSON.stringify(
    [...designLangaugeCustomProperties, ...nonDesignLangaugeCustomProperties],
    null,
    2,
  ),
);

// eslint-disable-next-line no-console
console.log('🎊 Finishing building known custom properties.');
