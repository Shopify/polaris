import React from 'react';
import {createMount} from '@shopify/react-testing';
// eslint-disable-next-line shopify/strict-component-boundaries
import {
  createPolarisContext,
  AppProviderContext,
} from '../components/AppProvider';
// eslint-disable-next-line shopify/strict-component-boundaries
import {FrameContext, FrameContextType} from '../components/Frame';
// eslint-disable-next-line shopify/strict-component-boundaries
import {
  createThemeContext,
  ThemeProviderContextType,
  ThemeProviderContext,
} from '../components/ThemeProvider';
import {PolarisContext} from '../components/types';
import {DeepPartial} from '../types';
import {merge} from '../utilities/merge';

interface Providers {
  polaris: PolarisContext;
  themeProvider: ThemeProviderContextType;
  frame: FrameContextType;
}
type Options = DeepPartial<Providers>;
type Context = Providers;
interface Props extends Providers {
  children: React.ReactElement<any>;
}

function noop() {}

function TestProvider({
  children,
  polaris,
  themeProvider,
  frame,
  ...props
}: Props) {
  const childWithProps =
    Object.keys(props).length > 0
      ? React.cloneElement(children, props)
      : children;

  return (
    <AppProviderContext.Provider value={polaris}>
      <ThemeProviderContext.Provider value={themeProvider}>
        <FrameContext.Provider value={frame}>
          {childWithProps}
        </FrameContext.Provider>
      </ThemeProviderContext.Provider>
    </AppProviderContext.Provider>
  );
}

export const mountWithContext = createMount<Options, Context>({
  context({polaris, themeProvider, frame}) {
    const polarisContextDefault = createPolarisContext();
    const polarisContext =
      (polaris && merge(polarisContextDefault, polaris)) ||
      polarisContextDefault;

    const themeproviderContextDefault = createThemeContext();
    const themeProviderContext =
      (themeProvider && merge(themeproviderContextDefault, themeProvider)) ||
      themeproviderContextDefault;

    const frameContextDefault = {
      showToast: noop,
      hideToast: noop,
      setContextualSaveBar: noop,
      removeContextualSaveBar: noop,
      startLoading: noop,
      stopLoading: noop,
    };
    const frameContext =
      (frame && merge(frameContextDefault, frame)) || frameContextDefault;

    return {
      polaris: polarisContext,
      themeProvider: themeProviderContext,
      frame: frameContext,
    };
  },
  render(element, {polaris, themeProvider, frame}) {
    return (
      <TestProvider
        polaris={polaris}
        themeProvider={themeProvider}
        frame={frame}
      >
        {element}
      </TestProvider>
    );
  },
});
