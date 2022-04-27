import React from 'react';
import {withPerformance} from 'storybook-addon-performance';

import {AppProvider} from '../src';
import enTranslations from '../locales/en.json';
import {GridOverlay} from './GridPanel';

function StrictModeDecorator(Story, context) {
  const {strictMode} = context.globals;
  const Wrapper = strictMode ? React.StrictMode : React.Fragment;

  return (
    <Wrapper>
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

function GridOverlayDecorator(Story, context) {
  const {showGrid, gridInFrame, gridWidth, gridLayer} = context.globals;

  const gridOverlay = showGrid ? (
    <GridOverlay inFrame={gridInFrame} maxWidth={gridWidth} layer={gridLayer} />
  ) : null;

  return (
    <>
      {gridOverlay}
      <Story />
    </>
  );
}

export const globalTypes = {
  strictMode: {
    name: 'React.StrictMode',
    defaultValue: false,
    toolbar: {
      items: [
        {title: 'Disabled', value: 'false'},
        {title: 'Enabled', value: 'true'},
      ],
      showName: true,
    },
  },
};

export const decorators = [
  GridOverlayDecorator,
  StrictModeDecorator,
  AppProviderDecorator,
  withPerformance,
];
