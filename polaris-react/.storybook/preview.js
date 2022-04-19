import React from 'react';
import {withPerformance} from 'storybook-addon-performance';

import {AppProvider} from '../src';
import {GridOverlay} from './GridOverlay/GridOverlay';
import enTranslations from '../locales/en.json';

function StrictModeDecorator(Story, context) {
  const gridOverlay = context.globals.grid === 'true' ? <GridOverlay /> : null;
  const Wrapper =
    context.globals.strictMode === 'true' ? React.StrictMode : React.Fragment;

  return (
    <Wrapper>
      {gridOverlay}
      <Story {...context} />
    </Wrapper>
  );
}

function AppProviderDecorator(Story, context) {
  if (context.args.omitAppProvider) return <Story {...context} />;

  return (
    <AppProvider i18n={enTranslations}>
      <Story {...context} />
    </AppProvider>
  );
}

export const globalTypes = {
  strictMode: {
    name: 'React.StrictMode',
    defaultValue: 'false',
    toolbar: {
      items: [
        {title: 'Disabled', value: 'false'},
        {title: 'Enabled', value: 'true'},
      ],
      showName: true,
    },
  },
  grid: {
    name: 'Grid overlay',
    defaultValue: 'false',
    toolbar: {
      items: [
        {title: 'Hide', value: 'false'},
        {title: 'Show', value: 'true'},
      ],
      showName: true,
    },
  },
};

export const decorators = [
  StrictModeDecorator,
  AppProviderDecorator,
  withPerformance,
];
