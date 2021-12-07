/* eslint-disable no-console */
const path = require('path');

const { testPages, getCurrentStoryIds } = require('./storybook-a11y-test');

const iframePath = path.join(
  'file://',
  __dirname,
  '../build-internal/storybook/static/iframe.html',
);

(async () => {
  const storyIds = await getCurrentStoryIds({
    iframePath,
    skippedStoryIds: ['playground-playground'],
  });

  const results = await testPages({ iframePath, storyIds, timeout: 15000 });

  if (results.length) {
    console.error(`‼️  Test failures found`);
    console.log(results.join('\n'));
    process.exit(1);
  } else {
    console.log('🧚‍♀️ Accessibility is all g');
  }
})();
