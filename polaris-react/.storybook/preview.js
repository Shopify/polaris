import React from 'react';
import {withPerformance} from 'storybook-addon-performance';

import {AppProvider} from '../src';
import enTranslations from '../locales/en.json';
import {GridOverlay} from './GridOverlay';

function StrictModeDecorator(Story, context) {
  const {strictMode, grid} = context.globals;
  const Wrapper = strictMode === 'true' ? React.StrictMode : React.Fragment;
  const gridOverlay =
    grid === 'true' || grid === 'inset' || grid === 'inFrame' ? (
      <GridOverlay inset={grid === 'inset'} inFrame={grid === 'inFrame'} />
    ) : null;
  console.log({grid});
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
        {title: 'Full width', value: 'true'},
        {title: 'Inset', value: 'inset'},
        {title: 'Within Frame', value: 'inFrame'},
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
