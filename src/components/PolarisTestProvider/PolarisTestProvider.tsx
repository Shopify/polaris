import React from 'react';
import {FrameContext} from '../../utilities/frame';
import {Theme, ThemeContext} from '../../utilities/theme';
import {
  ScrollLockManager,
  ScrollLockManagerContext,
} from '../../utilities/scroll-lock-manager';
import {
  StickyManager,
  StickyManagerContext,
} from '../../utilities/sticky-manager';
import {I18n, I18nContext, TranslationDictionary} from '../../utilities/i18n';
import {LinkContext, LinkLikeComponent} from '../../utilities/link';
import {
  UniqueIdFactory,
  UniqueIdFactoryContext,
  globalIdGeneratorFactory,
} from '../../utilities/unique-id';

type FrameContextType = NonNullable<React.ContextType<typeof FrameContext>>;

/**
 * When writing a custom mounting function `mountWithAppContext(node, options)`
 * this is the type of the options object. These values are customizable when
 * you call the app
 */
export type WithPolarisTestProviderOptions = {
  // Contexts provided by AppProvider
  i18n?: TranslationDictionary | TranslationDictionary[];
  link?: LinkLikeComponent;
  theme?: Partial<Theme>;
  // Contexts provided by Frame
  frame?: Partial<FrameContextType>;
};

export interface PolarisTestProviderProps
  extends WithPolarisTestProviderOptions {
  children: React.ReactElement;
  strict?: boolean;
}

export function PolarisTestProvider({
  strict,
  children,
  i18n,
  link,
  theme,
  frame,
}: PolarisTestProviderProps) {
  const Wrapper = strict ? React.StrictMode : React.Fragment;

  const intl = new I18n(i18n || {});

  const scrollLockManager = new ScrollLockManager();

  const stickyManager = new StickyManager();

  const uniqueIdFactory = new UniqueIdFactory(globalIdGeneratorFactory);

  const mergedTheme = createThemeContext(theme);

  const mergedFrame = createFrameContext(frame);

  return (
    <Wrapper>
      <I18nContext.Provider value={intl}>
        <ScrollLockManagerContext.Provider value={scrollLockManager}>
          <StickyManagerContext.Provider value={stickyManager}>
            <UniqueIdFactoryContext.Provider value={uniqueIdFactory}>
              <LinkContext.Provider value={link}>
                <ThemeContext.Provider value={mergedTheme}>
                  <FrameContext.Provider value={mergedFrame}>
                    {children}
                  </FrameContext.Provider>
                </ThemeContext.Provider>
              </LinkContext.Provider>
            </UniqueIdFactoryContext.Provider>
          </StickyManagerContext.Provider>
        </ScrollLockManagerContext.Provider>
      </I18nContext.Provider>
    </Wrapper>
  );
}

function noop() {}

function createThemeContext(theme: Partial<Theme> = {}): Theme {
  const {logo = null} = theme;
  return {logo};
}

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
