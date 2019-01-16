import {
  configure,
  addDecorator,
  getStorybook,
  setAddon,
} from '@storybook/react';
import {setConsoleOptions} from '@storybook/addon-console';
import {withNotes} from '@storybook/addon-notes';
import {withOptions} from '@storybook/addon-options';
import {themes} from '@storybook/components';
import createPercyAddon from '@percy-io/percy-storybook';
import tokens from '@shopify/polaris-tokens';

import {
  addPlaygroundStory,
  generateStories,
  hydrateExecutableExamples,
} from './stories-from-readme';

// addon-options
addDecorator(
  withOptions({
    name: 'Shopify Polaris Storybook',
    url: '/',
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
    theme: {
      ...themes.normal,
      mainTextSize: '16',
      mainBorderRadius: 0,
      mainBackground: tokens.colorSkyLight,
      mainTextColor: tokens.colorInk,
      dimmedTextColor: tokens.colorInkLighter,
      successColor: tokens.colorGreenDark,
      failColor: tokens.colorRedDark,
      warnColor: tokens.colorOrange,
      // TODO more pretty brand colors?
      // SEE https://github.com/storybooks/storybook/blob/next/lib/components/src/theme.js
    },
  }),
);

// addon-notes
addDecorator(withNotes);

// addon-console
setConsoleOptions((opts) => {
  // When transpiling TS using isolatedModules, the compiler doesn't strip
  // out exported types as it doesn't know if an item is a type or not.
  // Ignore those warnings as we don't care about them.
  // ignore color because the addon doesn't handle colored logs properly
  opts.panelExclude = [
    ...opts.panelExclude,
    /export .* was not found in/,
    /color: #999933;/,
  ];
  return opts;
});

// percy-storybook
const {percyAddon, serializeStories} = createPercyAddon();
setAddon(percyAddon);

// import all README.md files within component folders
const readmeReq = require.context(
  '../src/components',
  true,
  /\/.+\/README.md$/,
);
function loadStories() {
  addPlaygroundStory(module);

  readmeReq.keys().forEach((filename) => {
    const readme = readmeReq(filename).component;
    generateStories(hydrateExecutableExamples(readme), module);
  });
}

configure(loadStories, module);

serializeStories(getStorybook);
