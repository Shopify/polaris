module.exports = (_, ...selectors) => {
  // Duplicate the styles across each of the given selectors
  return selectors.reduce((result, selector) => {
    // Strip any wrapping quotes for complex selectors
    result[selector.replace(/^['"]?(.*?)['"]?$/, '$1')] = {
      '@mixin-content': {},
    };
    return result;
  }, {});
};
