module.exports = {
  // Because SASS would correctly handle passing a value of `null`, but the
  // `postcss-mixins` plugin treats it as the literal string `null`, so we have to
  // handle it manually.
  nullish(val) {
    return val == null || val === 'null' || val === 'undefined';
  },
};
