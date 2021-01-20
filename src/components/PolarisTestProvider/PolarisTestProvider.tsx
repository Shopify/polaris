import React, {Fragment, StrictMode} from 'react';

import {PortalsManager} from '../PortalsManager';
import {FocusManager} from '../FocusManager';
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
import {I18n, I18nContext} from '../../utilities/i18n';
import {LinkContext, LinkLikeComponent} from '../../utilities/link';
import {FeaturesConfig, FeaturesContext} from '../../utilities/features';
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
export interface WithPolarisTestProviderOptions {
  // Contexts provided by AppProvider
  i18n?: ConstructorParameters<typeof I18n>[0];
  link?: LinkLikeComponent;
  theme?: ThemeConfig;
  mediaQuery?: Partial<MediaQueryContextType>;
  features?: FeaturesConfig;
  // Contexts provided by Frame
  frame?: Partial<FrameContextType>;
}

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
  link,
  theme = {},
  mediaQuery,
  features = {},
  frame,
}: PolarisTestProviderProps) {
  const Wrapper = strict ? StrictMode : Fragment;
  const intl = new I18n(i18n || {});
  const scrollLockManager = new ScrollLockManager();

  const stickyManager = new StickyManager();

  const uniqueIdFactory = new UniqueIdFactory(globalIdGeneratorFactory);

  const processedThemeConfig = {...theme, colorScheme: 'light' as const};

  const customProperties = buildCustomProperties(processedThemeConfig);
  const mergedTheme = buildThemeContext(processedThemeConfig, customProperties);

  const mergedFrame = createFrameContext(frame);

  const mergedMediaQuery = merge(defaultMediaQuery, mediaQuery);

  return (
    <Wrapper>
      <FeaturesContext.Provider value={features}>
        <I18nContext.Provider value={intl}>
          <ScrollLockManagerContext.Provider value={scrollLockManager}>
            <StickyManagerContext.Provider value={stickyManager}>
              <UniqueIdFactoryContext.Provider value={uniqueIdFactory}>
                <LinkContext.Provider value={link}>
                  <ThemeContext.Provider value={mergedTheme}>
                    <MediaQueryContext.Provider value={mergedMediaQuery}>
                      <PortalsManager>
                        <FocusManager>
                          <FrameContext.Provider value={mergedFrame}>
                            {children}
                          </FrameContext.Provider>
                        </FocusManager>
                      </PortalsManager>
                    </MediaQueryContext.Provider>
                  </ThemeContext.Provider>
                </LinkContext.Provider>
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
