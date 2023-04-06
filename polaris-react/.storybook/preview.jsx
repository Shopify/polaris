import React from 'react';

import {AppProvider} from '../src';
import enTranslations from '../locales/en.json';
import {GridOverlay} from './GridOverlay';
import {RenderPerformanceProfiler} from './RenderPerformanceProfiler';
import {gridOptions} from './manager';
import {breakpoints} from '@shopify/polaris-tokens';

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
    defaultValue: true,
    toolbar: {
      items: [
        {title: 'Disabled', value: false},
        {title: 'Enabled', value: true},
      ],
      title: 'React.StrictMode',
    },
  },
  profiler: {
    name: 'React.Profiler',
    defaultValue: false,
    toolbar: {
      items: [
        {title: 'Disabled', value: false},
        {title: 'Enabled', value: true},
      ],
      title: 'React.Profiler',
    },
  },
  ...gridOptions,
};
const viewPorts = Object.entries({
  ...breakpoints,
  'breakpoints-xs': '20rem', // Replace the 0px xs breakpoint with 320px (20rem) for testing small screens
}).map(([key, value]) => {
  return {
    name: key,
    styles: {width: value, height: '100%'},
  };
});

export const parameters = {viewport: {viewports: {...viewPorts}}};

export const decorators = [
  GridOverlayDecorator,
  StrictModeDecorator,
  AppProviderDecorator,
  ReactRenderProfiler,
];
