import React from 'react';
import {configure, addParameters, addDecorator} from '@storybook/react';
import {setConsoleOptions} from '@storybook/addon-console';
import {withContexts} from '@storybook/addon-contexts/react';
import {create} from '@storybook/theming';
import tokens from '@shopify/polaris-tokens';
import {AppProvider} from '../src';
import enTranslations from '../locales/en.json';
import {UNSTABLE_Color} from '../src/utilities/theme';

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
  percy: {
    skip: true,
    widths: [375, 1280],
  },
});

addDecorator(function PaddingDecorator(story) {
  return <div style={{padding: '8px'}}>{story()}</div>;
});

function StrictModeToggle({isStrict = false, children}) {
  const Wrapper = isStrict ? React.StrictMode : React.Fragment;
  return <Wrapper>{children}</Wrapper>;
}

addDecorator(
  withContexts([
    {
      title: 'Strict Mode',
      components: [StrictModeToggle],
      params: [
        {name: 'Disabled', props: {isStrict: false}},
        {name: 'Enabled', default: true, props: {isStrict: true}},
      ],
    },
    {
      title: 'Global Theming',
      components: [AppProvider],
      params: [
        {
          name: 'Disabled',
          default: true,
          props: {i18n: enTranslations},
        },
        {
          name: 'Enabled - Light Mode',
          props: {
            i18n: enTranslations,
            features: {
              unstableGlobalTheming: true,
              theme: {UNSTABLE_colors: {surface: UNSTABLE_Color.Surface}},
            },
          },
        },
        {
          name: 'Enabled - Dark Mode',
          props: {
            i18n: enTranslations,
            features: {unstableGlobalTheming: true},
            theme: {
              UNSTABLE_colors: {surface: UNSTABLE_Color.DarkSurface},
            },
          },
        },
      ],
    },
  ]),
);

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

configure(
  [
    // Playground stories
    require.context('../playground', true, /stories.tsx$/),
    // Component readme stories
    require.context('../src/components', true, /\/.+\/README.md$/),
  ],
  module,
);
