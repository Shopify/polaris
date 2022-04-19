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

(async () => {
  for (const [configName, config] of Object.entries(configs)) {
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
        `✅ stylelint-polaris found ${config.expectedFailures} errors in ${configName} config test`,
      );
    } else {
      throw Error(
        `❌ stylelint-polaris found ${foundFailues} errors. Failed to find ${config.expectedFailures} errors in the ${configName} config test`,
      );
    }
  }
})();
