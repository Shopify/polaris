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

function ReactRenderProfiler(Story, context) {
  const {profiler} = context.globals;
  const Wrapper = profiler ? RenderPerformanceProfiler : React.Fragment;
  const props = profiler ? {id: context.id, kind: context.kind} : {};

  return (
    <Wrapper {...props}>
      <Story {...context} />
    </Wrapper>
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
      showName: 'true',
    },
  },
  profiler: {
    name: 'React.Profiler',
    defaultValue: 'false',
    toolbar: {
      items: [
        {title: 'Disabled', value: 'false'},
        {title: 'Enabled', value: 'true'},
      ],
      showName: 'true',
    },
  },
};

export const decorators = [
  GridOverlayDecorator,
  StrictModeDecorator,
  AppProviderDecorator,
  ReactRenderProfiler,
];
