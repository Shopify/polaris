import {configure, addParameters} from '@storybook/react';
import {setConsoleOptions} from '@storybook/addon-console';
import {create} from '@storybook/theming';
import tokens from '@shopify/polaris-tokens';

import {
  addPlaygroundStory,
  generateStories,
  hydrateExecutableExamples,
} from './stories-from-readme';

addParameters({
  options: {
    panelPosition: 'bottom',
    theme: create({
      base: 'light',
      brandTitle: 'Shopify Polaris Storybook',
      brandUrl: '/',
      brandImage: null,
      appBorderRadius: 0,
      appBg: tokens.colorSkyLight,
      contentBg: tokens.colorSkyLight,
      textColor: tokens.colorInk,
      // TODO more pretty brand colors?
      // SEE https://github.com/storybooks/storybook/blob/next/docs/src/pages/configurations/theming/index.md
    }),
  },
  backgrounds: [
    {name: 'Sky Light', value: tokens.colorSkyLight, default: true},
    {name: 'White', value: '#fff'},
  ],
  percy: {
    skip: true,
    widths: [375, 1280],
  },
});

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
