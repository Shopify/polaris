import React from 'react';

import {AppProvider} from '../src';
import enTranslations from '../locales/en.json';
import {GridOverlay} from './GridOverlay';
import {RenderPerformanceProfiler} from './RenderPerformanceProfiler';

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

function RenderPerformanceProfilerDecorator(Story, context) {
  return (
    <RenderPerformanceProfiler id={context.id} kind={context.kind}>
      <Story {...context} />
    </RenderPerformanceProfiler>
  );
}

export const globalTypes = {
  strictMode: {
    name: 'React.StrictMode',
    defaultValue: 'true',
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
  RenderPerformanceProfilerDecorator,
];
