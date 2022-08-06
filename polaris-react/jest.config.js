export default {
  moduleNameMapper: {
    '^tests/(.*)': '<rootDir>/tests/$1',
  },
  setupFiles: ['<rootDir>/tests/setup/environment.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup/tests.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '\\.(js|tsx?)$': [
      'babel-jest',
      {targets: 'current node', envName: 'test', rootMode: 'upward'},
    ],
    '\\.s?css$': '<rootDir>/config/jest-transform-style.js',
    '\\.svg$': '<rootDir>/config/jest-transform-image.js',
  },
  watchPathIgnorePatterns: ['<rootDir>/build', '<rootDir>/node_modules'],
};
