module.exports = {
  transform: {
    '\\.[jt]sx?$': [
      'babel-jest',
      {targets: 'current node', envName: 'test', rootMode: 'upward'},
    ],
  },
};
