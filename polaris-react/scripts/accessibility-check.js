/* eslint-disable no-console */
import path from 'path';

import {A11yTestRunner} from '@shopify/storybook-a11y-test';

(async () => {
  const buildDir = path.join(__dirname, '../build-internal/storybook/static');
  const testRunner = new A11yTestRunner(buildDir);

  try {
    const allStoryIds = await testRunner.collectEnabledStoryIdsFromIFrame();
    const storyIds = allStoryIds.filter(
      (id) =>
        ![
          'playground--details-page',
          'playground--kitchen-sink',
          'playground--playground',
        ].includes(id),
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
