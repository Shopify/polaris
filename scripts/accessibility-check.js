/* eslint-disable no-console */
const path = require('path');

const {testPages, getCurrentStoryIds} = require('@shopify/storybook-a11y-test');
<<<<<<< HEAD

(async () => {
  const iframePath = path.join(
    'file://',
    __dirname,
    '../build-internal/storybook/static/iframe.html',
  );

  const storyIds = await getCurrentStoryIds({
    iframePath,
    skippedStoryIds: ['playground-playground'],
  });

  const results = await testPages({
    iframePath,
    storyIds,
  });
=======

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

  const results = await testPages({iframePath, storyIds});
>>>>>>> 424a8d6e1 (Fix a11y check)

  if (results.length) {
    console.error(`‼️  Accessibility violations found`);
    console.log(results.join('\n'));
    process.exit(1);
  } else {
    console.log('🧚  Accessibility tests passed');
  }
})();
