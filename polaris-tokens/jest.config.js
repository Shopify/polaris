module.exports = {
  transform: {
    '^.+\\.(m?js|tsx?)$': ['babel-jest', {rootMode: 'upward'}],
  },
};
