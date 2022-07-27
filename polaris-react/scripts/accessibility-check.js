/* eslint-disable no-console */
const path = require('path');

const {A11yTestRunner} = require('@shopify/storybook-a11y-test');

(async () => {
  const buildDir = path.join(__dirname, '../build-internal/storybook/static');
  const testRunner = new A11yTestRunner(buildDir);

  try {
    const allStoryIds = await testRunner.collectEnabledStoryIdsFromIFrame();
    const storyIds = allStoryIds.filter(
      (id) => !id.includes('playground-playground'),
    );

    const results = await testRunner.testStories({
      storyIds,
      disableAnimation: true,
    });

    const failures = results.length;

    if (failures) {
      console.error(
        `🔴 ${failures} ${failures === 1 ? 'failure' : 'failures'} found`,
      );
      console.log(results.join('\n'));
      process.exit(1);
    } else {
      console.log('🟢 Accessibility tests passed');
    }
  } finally {
    await testRunner.teardown();
  }
})();
