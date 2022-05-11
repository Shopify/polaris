module.exports = {
  transform: {
    '^.+\\.(m?js|tsx?)$': [
      'babel-jest',
      {targets: 'current node', envName: 'test', rootMode: 'upward'},
    ],
  },
};
