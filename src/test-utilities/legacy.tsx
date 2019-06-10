import {ReactWrapper, CommonWrapper, mount} from 'enzyme';
import React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {ClientApplication} from '@shopify/app-bridge';
import {I18n, I18nContext, TranslationDictionary} from '../utilities/i18n';
import {get} from '../utilities/get';
import {merge} from '../utilities/merge';
import {PolarisContext} from '../components/types';
import {DeepPartial} from '../types';
import translations from '../../locales/en.json';

import {createPolarisContext} from '../utilities/create-polaris-context';
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
import {AppBridgeContext} from '../utilities/app-bridge';
import {Link, LinkContext, LinkLikeComponent} from '../utilities/link';

export type AnyWrapper = ReactWrapper<any, any> | CommonWrapper<any, any>;

export function findByTestID(root: ReactWrapper<any, any>, id: string) {
  function hasTestID(wrapper: ReactWrapper<any, any>) {
    return wrapper.length > 0 && wrapper.prop('testID') === id;
  }

  return root.findWhere(hasTestID).first();
}

export function matchByTestID(root: ReactWrapper<any, any>, regexp: RegExp) {
  function matchesTestID(wrapper: ReactWrapper<any, any>) {
    const id = wrapper.prop('testID');
    return typeof id === 'string' && regexp.test(id);
  }

  return root.findWhere(matchesTestID);
}

export function trigger(wrapper: AnyWrapper, keypath: string, ...args: any[]) {
  if (wrapper.length === 0) {
    throw new Error(
      [
        `You tried to trigger ${keypath} on a React wrapper with no matching nodes.`,
        'This generally happens because you have either filtered your React components incorrectly,',
        'or the component you are looking for is not rendered because of the props on your component,',
        'or there is some error during one of your component’s render methods.',
      ].join(' '),
    );
  }

  const props = wrapper.props();
  const callback = get(props, keypath);

  if (callback == null) {
    throw new Error(
      `No callback found at keypath '${keypath}'. Available props: ${Object.keys(
        props,
      ).join(', ')}`,
    );
  }

  // eslint-disable-next-line callback-return
  const returnValue = callback(...args);
  updateRoot(wrapper);

  if (returnValue instanceof Promise) {
    return returnValue.then((ret) => {
      updateRoot(wrapper);
      return ret;
    });
  }

  return returnValue;
}

function updateRoot(wrapper: AnyWrapper) {
  (wrapper as any).root().update();
}

type AppContext = {
  polaris: PolarisContext;
  intl: I18n;
  scrollLockManager: ScrollLockManager;
  stickyManager: StickyManager;
  appBridge: ClientApplication<{}> | {} | null;
  themeProvider: ThemeProviderContextType;
  frame: FrameContextType;
  link: Link;
};

interface AppContextOptions {
  app: AppContext;
}

interface MountWithAppProviderOptions {
  context?: {
    polaris?: DeepPartial<PolarisContext>;
    themeProvider?: DeepPartial<ThemeProviderContextType>;
    frame?: DeepPartial<FrameContextType>;
    intl?: TranslationDictionary | TranslationDictionary[];
    scrollLockManager?: ScrollLockManager;
    stickyManager?: StickyManager;
    appBridge?: ClientApplication<{}> | {};
    link?: LinkLikeComponent;
  };
}

export function mountWithAppProvider<P>(
  node: React.ReactElement<P>,
  options: MountWithAppProviderOptions = {},
): PolarisContextReactWrapper<P, any> {
  const {context: ctx = {}} = options;

  const polarisDefault = createPolarisContext({i18n: translations});
  const polaris =
    (ctx.polaris && merge(polarisDefault, ctx.polaris)) || polarisDefault;

  const intlTranslations =
    (ctx.intl && merge(translations, ctx.intl)) || translations;
  const intl = new I18n(intlTranslations);

  const scrollLockManager = ctx.scrollLockManager || new ScrollLockManager();

  const stickyManager = ctx.stickyManager || new StickyManager();

  const themeproviderDefault = createThemeContext();
  const themeProvider =
    (ctx.themeProvider && merge(themeproviderDefault, ctx.themeProvider)) ||
    themeproviderDefault;

  const frameDefault = {
    showToast: noop,
    hideToast: noop,
    setContextualSaveBar: noop,
    removeContextualSaveBar: noop,
    startLoading: noop,
    stopLoading: noop,
  };
  const frame = (ctx.frame && merge(frameDefault, ctx.frame)) || frameDefault;

  const link = new Link(ctx.link);

  const appBridge = ctx.appBridge || null;

  const context: AppContext = {
    polaris,
    themeProvider,
    frame,
    intl,
    scrollLockManager,
    stickyManager,
    appBridge,
    link,
  };

  const wrapper = polarisContextReactWrapper(node, {
    app: context,
  });

  return wrapper;
}

type PolarisContextReactWrapper<P, S> = ReactWrapper<P, S> & AppContextOptions;

export function polarisContextReactWrapper<P, S>(
  element: React.ReactElement<P>,
  {app}: AppContextOptions,
): PolarisContextReactWrapper<P, S> {
  function TestProvider<P>(props: P) {
    let content: React.ReactNode = element;

    if (Object.keys(props).length > 0) {
      content = React.cloneElement(React.Children.only(element), props);
    }

    return (
      <React.StrictMode>
        <I18nContext.Provider value={app.intl}>
          <ScrollLockManagerContext.Provider value={app.scrollLockManager}>
            <StickyManagerContext.Provider value={app.stickyManager}>
              <ThemeProviderContext.Provider value={app.themeProvider}>
                <AppBridgeContext.Provider value={app.appBridge as any}>
                  <LinkContext.Provider value={app.link}>
                    <FrameContext.Provider value={app.frame}>
                      {content}
                    </FrameContext.Provider>
                  </LinkContext.Provider>
                </AppBridgeContext.Provider>
              </ThemeProviderContext.Provider>
            </StickyManagerContext.Provider>
          </ScrollLockManagerContext.Provider>
        </I18nContext.Provider>
      </React.StrictMode>
    );
  }

  const wrapper = mount<P, S>(<TestProvider />);

  Object.defineProperty(wrapper, 'app', {
    enumerable: true,
    writable: false,
    configurable: false,
    value: app,
  });

  return wrapper as PolarisContextReactWrapper<P, S>;
}
