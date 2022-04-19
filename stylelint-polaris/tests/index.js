/* eslint-disable no-console */
const path = require('path');

const stylelint = require('stylelint');

const configs = {
  external: {
    path: path.join(__dirname, '../index.js'),
    files: ['./external-fixture.scss', './coverage-fixture.scss'],
    expectedFailures: 27,
  },
  internal: {
    path: path.join(__dirname, '../configs/internal.js'),
    files: ['./internal-fixture.scss', './coverage-fixture.scss'],
    expectedFailures: 26,
  },
};

const testFile = async (configName, config) => {
  const {results} = await stylelint.lint({
    config: {
      extends: config.path,
      customSyntax: 'postcss-scss',
    },
    files: config.files,
    globbyOptions: {
      cwd: __dirname,
    },
  });

  const foundFailues = results.reduce(
    (warnings, result) => warnings + result.warnings.length,
    0,
  );

  if (foundFailues === config.expectedFailures) {
    console.log(
      `✅ stylelint-polaris found the expected ${foundFailues}/${config.expectedFailures} errors in ${configName}`,
    );
  } else {
    throw Error(
      `❌ stylelint-polaris did not find ${foundFailues}/${config.expectedFailures} errors in the ${configName} test`,
    );
  }
};

(async () => {
  const tests = Object.entries(configs).map(([configName, config]) =>
    testFile(configName, config),
  );
  await Promise.all(tests);
})();
