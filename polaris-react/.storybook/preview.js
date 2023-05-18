import React from 'react';

import {AppProvider, Frame} from '../src';
import enTranslations from '../locales/en.json';
import {GridOverlay} from './GridOverlay';
import {RenderPerformanceProfiler} from './RenderPerformanceProfiler';
import {gridOptions, featureFlagOptions} from './manager';
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
  const {polarisSummerEditions2023} = context.globals;
  if (context.args.omitAppProvider) return <Story {...context} />;
  return (
    <AppProvider
      features={{
        polarisSummerEditions2023,
      }}
      i18n={enTranslations}
    >
      <Frame>
        <Story {...context} />
      </Frame>
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
    defaultValue: true,
    toolbar: {
      title: 'React.StrictMode',
      items: [
        {title: 'Disabled', value: false},
        {title: 'Enabled', value: true},
      ],
    },
  },
  profiler: {
    defaultValue: false,
    toolbar: {
      title: 'React.Profiler',
      items: [
        {title: 'Disabled', value: false},
        {title: 'Enabled', value: true},
      ],
    },
  },
  ...featureFlagOptions,
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

export const parameters = {
  viewport: {viewports: {...viewPorts}},
  // Increases precision of rendered snapshot diffs. Default is 0.063
  chromatic: {diffThreshold: 0.03},
};

export const decorators = [
  GridOverlayDecorator,
  StrictModeDecorator,
  AppProviderDecorator,
  ReactRenderProfiler,
];
