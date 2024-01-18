import React, {useMemo, Fragment, StrictMode} from 'react';
import type {ThemeName} from '@shopify/polaris-tokens';
import {themeNameDefault} from '@shopify/polaris-tokens';

import {PortalsManager} from '../PortalsManager';
import {FocusManager} from '../FocusManager';
import {merge} from '../../utilities/merge';
import {FrameContext} from '../../utilities/frame';
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
import {LinkContext} from '../../utilities/link';
import type {LinkLikeComponent} from '../../utilities/link';
import {FeaturesContext} from '../../utilities/features';
import type {FeaturesConfig} from '../../utilities/features';
import {EphemeralPresenceManager} from '../EphemeralPresenceManager';
import {ThemeContext, getTheme} from '../../utilities/use-theme';

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
  mediaQuery?: Partial<MediaQueryContextType>;
  features?: FeaturesConfig;
  theme?: ThemeName;
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
  mediaQuery,
  features,
  frame,
  theme = themeNameDefault,
}: PolarisTestProviderProps) {
  const Wrapper = strict ? StrictMode : Fragment;
  const intl = useMemo(() => new I18n(i18n || {}), [i18n]);
  const scrollLockManager = useMemo(() => new ScrollLockManager(), []);

  const stickyManager = useMemo(() => new StickyManager(), []);

  const mergedFrame = createFrameContext(frame);

  const mergedMediaQuery = merge(defaultMediaQuery, mediaQuery);

  return (
    <Wrapper>
      <ThemeContext.Provider value={getTheme(theme)}>
        <FeaturesContext.Provider value={features}>
          <I18nContext.Provider value={intl}>
            <ScrollLockManagerContext.Provider value={scrollLockManager}>
              <StickyManagerContext.Provider value={stickyManager}>
                <LinkContext.Provider value={link}>
                  <MediaQueryContext.Provider value={mergedMediaQuery}>
                    <PortalsManager>
                      <FocusManager>
                        <EphemeralPresenceManager>
                          <FrameContext.Provider value={mergedFrame}>
                            {children}
                          </FrameContext.Provider>
                        </EphemeralPresenceManager>
                      </FocusManager>
                    </PortalsManager>
                  </MediaQueryContext.Provider>
                </LinkContext.Provider>
              </StickyManagerContext.Provider>
            </ScrollLockManagerContext.Provider>
          </I18nContext.Provider>
        </FeaturesContext.Provider>
      </ThemeContext.Provider>
    </Wrapper>
  );
}

function noop() {}

function createFrameContext({
  logo = undefined,
  showToast = noop,
  hideToast = noop,
  toastMessages = [],
  setContextualSaveBar = noop,
  removeContextualSaveBar = noop,
  contextualSaveBarVisible = false,
  contextualSaveBarProps = {},
  startLoading = noop,
  stopLoading = noop,
}: Partial<FrameContextType> = {}): FrameContextType {
  return {
    logo,
    showToast,
    hideToast,
    toastMessages,
    setContextualSaveBar,
    removeContextualSaveBar,
    contextualSaveBarVisible,
    contextualSaveBarProps,
    startLoading,
    stopLoading,
  };
}
