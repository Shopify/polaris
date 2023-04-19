// This file is built using vite, so we can use `import.meta.env` to access environment variables.
// This file is also built by the vite config in './main.js

import React, {useRef, useEffect} from 'react';

import {AppProvider, FrameContext} from '../src';
import enTranslations from '../locales/en.json';
import {GridOverlay} from './GridOverlay';
import {RenderPerformanceProfiler} from './RenderPerformanceProfiler';
import {themeNameDefault, themeNames, themes} from '@shopify/polaris-tokens';
import {
  gridOptions,
  featureFlagOptions,
} from './addons/global-controls-panel/manager';

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

  const features = Object.keys(featureFlagOptions).reduce(
    (acc, featureFlag) => ({
      ...acc,
      [featureFlag]: context.globals[featureFlag],
    }),
    {},
  );

  return (
    <AppProvider
      theme={context.globals.theme}
      features={features}
      i18n={enTranslations}
    >
      <FrameContext.Provider value={{}}>
        <Story {...context} />
      </FrameContext.Provider>
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

/**
 * Ensures all anchor tags in a Storybook story open in the same tab by setting their `target` attribute to `_self` if
 * the target is not already set. This is to prevent the storybook preview iframe from navigating to the link target.
 *
 * Parameters:
 * - `disableAnchorTargetOverride` - Disable the anchor target override for a specific story
 */
function AnchorTargetOverrideDecorator(Story, context) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;

    if (node && !context?.parameters?.disableAnchorTargetOverride) {
      const updateAnchorTargets = () => {
        node.querySelectorAll('a').forEach((anchor) => {
          if (!anchor.getAttribute('target')) {
            anchor.setAttribute('target', '_self');
          }
        });
      };
      const observer = new MutationObserver(updateAnchorTargets);

      // Run the callback once immediately to update all existing anchor tags
      updateAnchorTargets();

      observer.observe(node, {childList: true, subtree: true});

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div ref={ref}>
      <Story {...context} />
    </div>
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
  theme: {
    description: 'Global theme for components',
    defaultValue: themeNameDefault,
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      items: themeNames,
      dynamicTitle: true,
    },
  },
  ...featureFlagOptions,
  ...gridOptions,
};
const {breakpoints} = themes[themeNameDefault];
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
  AnchorTargetOverrideDecorator,
];
