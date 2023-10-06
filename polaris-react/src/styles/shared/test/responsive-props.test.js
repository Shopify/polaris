/**
 * @jest-environment jest-environment-node-single-context
 */
const path = require('node:path');

const sassTrue = require('sass-true');

sassTrue.runSass(
  {describe, it},
  path.join(__dirname, 'responsive-props.test.scss'),
);
