const prefix = '@shopify/coverage';

function namespace(ruleName) {
  return `${prefix}/${ruleName}`;
}

function isRegExp(value) {
  return value instanceof RegExp;
}

function isString(value) {
  return typeof value === 'string';
}

module.exports = {
  isString,
  isRegExp,
  namespace,
};
