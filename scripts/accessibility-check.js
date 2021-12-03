/* eslint-disable no-console */
const path = require('path');

const {storybookA11yTest} = require('@shopify/storybook-a11y-test');

(async () => {
  const options = {
    iframePath: path.join(
      'file://',
      __dirname,
      '../build-internal/storybook/static/iframe.html',
    ),
    skippedStoryIds: ['playground-playground'],
  };

  const results = await storybookA11yTest(options);

  if (results.length) {
    console.error(`‼️  Test failures found`);
    console.log(results.join('\n'));
    process.exit(1);
  } else {
    console.log('🧚‍♀️ Accessibility is all g');
  }
})();
