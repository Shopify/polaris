import 'storybook-chroma';
import React from 'react';
import {
  configure,
  addParameters,
  addDecorator,
  storiesOf,
} from '@storybook/react';
import {setConsoleOptions} from '@storybook/addon-console';
import {create} from '@storybook/theming';
import tokens from '@shopify/polaris-tokens';
import {AppProvider} from '../src';
import {Playground} from '../playground/Playground';
import en from '../locales/en.json';

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
    // {name: 'Sky Light', value: tokens.colorSkyLight, default: true},
    {name: 'White', value: '#fff'},
  ],
  percy: {
    skip: true,
    widths: [375, 1280],
  },
});

addDecorator(function StrictModeDecorator(story) {
  return <React.StrictMode>{story()}</React.StrictMode>;
});

addDecorator(function AppProviderDecorator(story) {
  return (
    <div style={{padding: '8px'}}>
      <AppProvider i18n={en}>{story()}</AppProvider>
    </div>
  );
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

function addPlaygroundStory() {
  storiesOf('Playground|Playground', module)
    .addParameters({
      chromatic: {disable: true},
    })
    .add('Playground', () => <Playground />);
}

// import all README.md files within component folders
const readmeReq = require.context(
  '../src/components',
  true,
  /\/.+\/README.md$/,
);
function loadStories() {
  addPlaygroundStory();

  return readmeReq.keys().map((filename) => readmeReq(filename));
}

configure(loadStories, module);
