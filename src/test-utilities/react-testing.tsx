import React from 'react';
import {createMount} from '@shopify/react-testing';
import {ClientApplication} from '@shopify/app-bridge';
import {createThemeContext} from '../utilities/theme';
import {ScrollLockManager} from '../utilities/scroll-lock-manager';
import {StickyManager} from '../utilities/sticky-manager';
import {createAppBridge} from '../utilities/app-bridge';
import {I18n} from '../utilities/i18n';
import translations from '../../locales/en.json';
import {DeepPartial} from '../types';
import {merge} from '../utilities/merge';
import {Link} from '../utilities/link';
import {PolarisTestProvider} from './PolarisTestProvider';
import {ComplexProviders, SimpleProviders, ReturnedContext} from './types';

type Options = DeepPartial<ComplexProviders> & Partial<SimpleProviders>;
type Context = ReturnedContext;

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
      <PolarisTestProvider
        intl={intl}
        scrollLockManager={scrollLockManager}
        stickyManager={stickyManager}
        themeProvider={themeProvider}
        frame={frame}
        appBridge={appBridge}
        link={link}
      >
        {element}
      </PolarisTestProvider>
    );
  },
});

function noop() {}
