import React from 'react';
import {createMount} from '@shopify/react-testing';
import {ClientApplication} from '@shopify/app-bridge';
// eslint-disable-next-line shopify/strict-component-boundaries
import {FrameContext, FrameContextType} from '../components/Frame';
import {
  createThemeContext,
  ThemeProviderContextType,
  ThemeProviderContext,
} from '../utilities/theme';
import {
  ScrollLockManager,
  ScrollLockManagerContext,
} from '../utilities/scroll-lock-manager';
import {StickyManager, StickyManagerContext} from '../utilities/sticky-manager';
import {
  createAppBridge,
  AppBridgeContext,
  AppBridgeOptions,
} from '../utilities/app-bridge';
import {I18n, I18nContext, TranslationDictionary} from '../utilities/i18n';
import translations from '../../locales/en.json';
import {DeepPartial} from '../types';
import {merge} from '../utilities/merge';
import {Link, LinkContext, LinkLikeComponent} from '../utilities/link';

interface ComplexProviders {
  themeProvider: ThemeProviderContextType;
  frame: FrameContextType;
}

interface SimpleProvidersWithSameReturn {
  scrollLockManager: ScrollLockManager;
  stickyManager: StickyManager;
}
interface SimpleProvidersWithAltReturn {
  intl: TranslationDictionary | TranslationDictionary[];
  appBridge: AppBridgeOptions;
  link: LinkLikeComponent;
}
type SimpleProviders = SimpleProvidersWithSameReturn &
  SimpleProvidersWithAltReturn;

type ReturnedContext = ComplexProviders &
  SimpleProvidersWithSameReturn & {
    intl: I18n;
    appBridge: ClientApplication<{}> | null;
    link: Link;
  };
type Options = DeepPartial<ComplexProviders> & Partial<SimpleProviders>;
type Context = ReturnedContext;
interface Props extends Partial<ReturnedContext> {
  children: React.ReactElement<any>;
  strict?: boolean;
}

function noop() {}

export function TestProvider({
  strict,
  children,
  themeProvider = createThemeContext(),
  frame = {
    showToast: noop,
    hideToast: noop,
    setContextualSaveBar: noop,
    removeContextualSaveBar: noop,
    startLoading: noop,
    stopLoading: noop,
  },
  intl = new I18n(translations),
  scrollLockManager = new ScrollLockManager(),
  stickyManager = new StickyManager(),
  appBridge = null,
  link = new Link(undefined),
  ...props
}: Props) {
  const childWithProps =
    Object.keys(props).length > 0
      ? React.cloneElement(children, props)
      : children;

  const Wrapper = strict ? React.StrictMode : React.Fragment;

  return (
    <Wrapper>
      <I18nContext.Provider value={intl}>
        <ScrollLockManagerContext.Provider value={scrollLockManager}>
          <StickyManagerContext.Provider value={stickyManager}>
            <ThemeProviderContext.Provider value={themeProvider}>
              <AppBridgeContext.Provider value={appBridge}>
                <LinkContext.Provider value={link}>
                  <FrameContext.Provider value={frame}>
                    {childWithProps}
                  </FrameContext.Provider>
                </LinkContext.Provider>
              </AppBridgeContext.Provider>
            </ThemeProviderContext.Provider>
          </StickyManagerContext.Provider>
        </ScrollLockManagerContext.Provider>
      </I18nContext.Provider>
    </Wrapper>
  );
}

export const mountWithContext = createMount<Options, Context>({
  context({
    themeProvider,
    frame,
    intl,
    scrollLockManager,
    stickyManager,
    appBridge,
    link,
  }) {
    const intlTranslations =
      (intl && merge(translations, intl)) || translations;
    const intlContext = new I18n(intlTranslations);

    const scrollLockManagerContext =
      scrollLockManager || new ScrollLockManager();

    const stickyManagerContext = stickyManager || new StickyManager();

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

    let appBridgeContext: ClientApplication<{}> | null = null;
    if (appBridge) {
      const {shopOrigin, apiKey, forceRedirect} = appBridge;
      appBridgeContext = createAppBridge({
        shopOrigin,
        apiKey,
        forceRedirect,
      });
    }

    const linkContext = new Link(link);

    return {
      themeProvider: themeProviderContext,
      frame: frameContext,
      intl: intlContext,
      scrollLockManager: scrollLockManagerContext,
      stickyManager: stickyManagerContext,
      appBridge: appBridgeContext,
      link: linkContext,
    };
  },
  render(
    element,
    {
      themeProvider,
      frame,
      intl,
      scrollLockManager,
      stickyManager,
      appBridge,
      link,
    },
  ) {
    return (
      <TestProvider
        intl={intl}
        scrollLockManager={scrollLockManager}
        stickyManager={stickyManager}
        themeProvider={themeProvider}
        frame={frame}
        appBridge={appBridge}
        link={link}
      >
        {element}
      </TestProvider>
    );
  },
});
