/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const stylelint = require('stylelint');

const fixturePath = path.join(__dirname, 'fixture.css');
const fileContent = fs.readFileSync(fixturePath, 'utf-8');

(async () => {
  const {results} = await stylelint.lint({
    config: {
      extends: '../index.js',
      customSyntax: 'postcss-scss',
    },
    code: fileContent,
  });

  const foundFailues = results[0].warnings.length;
  const totalFailures = 26;

  if (foundFailues === totalFailures) {
    console.log(
      `✅ stylelint-polaris found ${totalFailures} errors in fixture.css`,
    );
  } else {
    throw Error(
      `❌ stylelint-polaris found ${foundFailues} errors. Failed to find ${totalFailures} errors in fixture.css`,
    );
  }
})();
