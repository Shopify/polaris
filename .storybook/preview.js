import React from 'react';
import {addParameters, addDecorator} from '@storybook/react';
import {setConsoleOptions} from '@storybook/addon-console';
import {withContexts} from '@storybook/addon-contexts/react';
import {color, withKnobs} from '@storybook/addon-knobs';
import DefaultThemeColors from '@shopify/polaris-tokens/dist-modern/theme/base.json';

import {AppProvider} from '../src';
import enTranslations from '../locales/en.json';

addParameters({
  options: {
    // showRoots: true,
  },
  percy: {
    skip: true,
    widths: [375, 1280],
  },
});

addDecorator(function PaddingDecorator(story) {
  return <>{story()}</>;
});

function StrictModeToggle({isStrict = false, children}) {
  const Wrapper = isStrict ? React.StrictMode : React.Fragment;
  return <Wrapper>{children}</Wrapper>;
}

function AppProviderWithKnobs({newDesignLanguage, colorScheme, children}) {
  const omitAppProvider = (() => {
    try {
      return children.props.children.props['data-omit-app-provider'];
    } catch (e) {
      return null;
    }
  })();

  if (omitAppProvider === 'true') return children;

  const colors = Object.entries(DefaultThemeColors).reduce(
    (accumulator, [key, value]) => ({
      ...accumulator,
      [key]: strToHex(color(key, value, 'Theme')),
    }),
    {},
  );

  return (
    <AppProvider
      i18n={enTranslations}
      features={{newDesignLanguage}}
      theme={{
        colors,
        colorScheme,
      }}
    >
      {children}
    </AppProvider>
  );
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
      title: 'New Design Language',
      components: [AppProviderWithKnobs],
      params: [
        {
          name: 'Disabled',
          default: true,
          props: {newDesignLanguage: false},
        },
        {
          name: 'Enabled - Light Mode',
          props: {newDesignLanguage: true, colorScheme: 'light'},
        },
        {
          name: 'Enabled - Dark Mode',
          props: {newDesignLanguage: true, colorScheme: 'dark'},
        },
      ],
    },
  ]),
);

addDecorator(withKnobs);

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

function strToHex(str) {
  if (str.charAt(0) === '#') return str;

  return `#${str
    .slice(5, -1)
    .split(',')
    .slice(0, 3)
    .map(Number)
    .map((n) => n.toString(16))
    .map((n) => n.padStart(2, '0'))
    .join('')}`;
}
