const stylelint = require('stylelint');

const rules = require('./rules');
const {namespace} = require('./utils');

const rulesPlugins = Object.keys(rules).map((ruleName) => {
  return stylelint.createPlugin(namespace(ruleName), rules[ruleName]);
});

module.exports = rulesPlugins;
