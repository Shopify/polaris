module.exports = {
  moduleNameMapper: {
    '^tests/(.*)': '<rootDir>/tests/$1',
  },
  testEnvironment: 'jsdom',
  transform: {
    '\\.(js|tsx?)$': [
      'babel-jest',
      {targets: 'current node', envName: 'test', rootMode: 'upward'},
    ],
  },
  watchPathIgnorePatterns: [
    '<rootDir>/.next',
    '<rootDir>/.cache',
    '<rootDir>/node_modules',
  ],
};
