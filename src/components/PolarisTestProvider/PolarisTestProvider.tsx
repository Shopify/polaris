import React from 'react';
import {merge} from '../../utilities/merge';
import {FrameContext} from '../../utilities/frame';
import {
  ThemeContext,
  ThemeConfig,
  buildThemeContext,
  buildCustomProperties,
} from '../../utilities/theme';
import {MediaQueryContext} from '../../utilities/media-query';
import {
  ScrollLockManager,
  ScrollLockManagerContext,
} from '../../utilities/scroll-lock-manager';
import {
  StickyManager,
  StickyManagerContext,
} from '../../utilities/sticky-manager';
import {AppBridgeContext, AppBridgeOptions} from '../../utilities/app-bridge';
import {I18n, I18nContext, TranslationDictionary} from '../../utilities/i18n';
import {LinkContext, LinkLikeComponent} from '../../utilities/link';
import {Features, FeaturesContext} from '../../utilities/features';
import {
  UniqueIdFactory,
  UniqueIdFactoryContext,
  globalIdGeneratorFactory,
} from '../../utilities/unique-id';

type FrameContextType = NonNullable<React.ContextType<typeof FrameContext>>;
type MediaQueryContextType = NonNullable<
  React.ContextType<typeof MediaQueryContext>
>;

/**
 * When writing a custom mounting function `mountWithAppContext(node, options)`
 * this is the type of the options object. These values are customizable when
 * you call the app
 */
export type WithPolarisTestProviderOptions = {
  // Contexts provided by AppProvider
  i18n?: TranslationDictionary | TranslationDictionary[];
  appBridge?: AppBridgeOptions;
  link?: LinkLikeComponent;
  theme?: ThemeConfig;
  mediaQuery?: Partial<MediaQueryContextType>;
  features?: Features;
  // Contexts provided by Frame
  frame?: Partial<FrameContextType>;
};

export interface PolarisTestProviderProps
  extends WithPolarisTestProviderOptions {
  children: React.ReactElement;
  strict?: boolean;
}

const defaultMediaQuery: MediaQueryContextType = {
  isNavigationCollapsed: false,
};

export function PolarisTestProvider({
  strict,
  children,
  i18n,
  appBridge,
  link,
  theme = {},
  mediaQuery,
  features = {},
  frame,
}: PolarisTestProviderProps) {
  const Wrapper = strict ? React.StrictMode : React.Fragment;

  const intl = new I18n(i18n || {});

  const scrollLockManager = new ScrollLockManager();

  const stickyManager = new StickyManager();

  const uniqueIdFactory = new UniqueIdFactory(globalIdGeneratorFactory);

  // This typing is odd, but as appBridge is deprecated and going away in v5
  // I'm not that worried about it
  const appBridgeApp = appBridge as React.ContextType<typeof AppBridgeContext>;

  const {unstableGlobalTheming = false} = features;
  const customProperties = unstableGlobalTheming
    ? buildCustomProperties(theme, unstableGlobalTheming)
    : undefined;
  const mergedTheme = buildThemeContext(theme, customProperties);

  const mergedFrame = createFrameContext(frame);

  const mergedMediaQuery = merge(defaultMediaQuery, mediaQuery);

  return (
    <Wrapper>
      <FeaturesContext.Provider value={features}>
        <I18nContext.Provider value={intl}>
          <ScrollLockManagerContext.Provider value={scrollLockManager}>
            <StickyManagerContext.Provider value={stickyManager}>
              <UniqueIdFactoryContext.Provider value={uniqueIdFactory}>
                <AppBridgeContext.Provider value={appBridgeApp}>
                  <LinkContext.Provider value={link}>
                    <ThemeContext.Provider value={mergedTheme}>
                      <MediaQueryContext.Provider value={mergedMediaQuery}>
                        <FrameContext.Provider value={mergedFrame}>
                          {children}
                        </FrameContext.Provider>
                      </MediaQueryContext.Provider>
                    </ThemeContext.Provider>
                  </LinkContext.Provider>
                </AppBridgeContext.Provider>
              </UniqueIdFactoryContext.Provider>
            </StickyManagerContext.Provider>
          </ScrollLockManagerContext.Provider>
        </I18nContext.Provider>
      </FeaturesContext.Provider>
    </Wrapper>
  );
}

function noop() {}

function createFrameContext({
  showToast = noop,
  hideToast = noop,
  setContextualSaveBar = noop,
  removeContextualSaveBar = noop,
  startLoading = noop,
  stopLoading = noop,
}: Partial<FrameContextType> = {}): FrameContextType {
  return {
    showToast,
    hideToast,
    setContextualSaveBar,
    removeContextualSaveBar,
    startLoading,
    stopLoading,
  };
}
