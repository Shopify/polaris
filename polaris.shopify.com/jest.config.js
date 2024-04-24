module.exports = {
  transform: {
    '\\.(js|tsx?)$': [
      'babel-jest',
      {targets: 'current node', envName: 'test', rootMode: 'upward'},
    ],
  },
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
};
