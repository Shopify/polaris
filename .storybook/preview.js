import React from 'react';
import {addParameters, addDecorator} from '@storybook/react';
import {setConsoleOptions} from '@storybook/addon-console';
import {withContexts} from '@storybook/addon-contexts/react';

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
      title: 'New Design Language',
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
            features: {newDesignLanguage: true},
            theme: {colorScheme: 'light'},
          },
        },
        {
          name: 'Enabled - Dark Mode',
          props: {
            i18n: enTranslations,
            features: {newDesignLanguage: true},
            theme: {colorScheme: 'dark'},
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
