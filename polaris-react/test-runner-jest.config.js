const {getJestConfig} = require('@storybook/test-runner');

// The default Jest configuration comes from @storybook/test-runner
const testRunnerConfig = getJestConfig();

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  ...testRunnerConfig,
  modulePathIgnorePatterns: [
    // This fails due to the `import.meta.glob` (a Vite-specific thing that jest
    // doesn't understand). We don't need to run Storybook tests on this anyway
    // since all the components in use are tested individually already.
    '<rootDir>/playground/',
  ],
  transform: {
    ...testRunnerConfig.transform,
    '\\.s?css$': '<rootDir>/config/jest-transform-style.js',
    '\\.svg$': '<rootDir>/config/jest-transform-image.js',
  },
  rootDir: __dirname,
};
