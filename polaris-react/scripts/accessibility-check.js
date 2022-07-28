/* eslint-disable no-console */
const path = require('path');

const {testPages, getCurrentStoryIds} = require('@shopify/storybook-a11y-test');

const iframePath = path.join(
  'file://',
  __dirname,
  '../build-internal/storybook/static/iframe.html',
);

(async () => {
  const storyIds = await getCurrentStoryIds({
    iframePath,
    skippedStoryIds: [
      'playground--details-page',
      'playground--kitchen-sink',
      'playground--playground',
    ],
  });

  const results = await testPages({
    iframePath,
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
})();
