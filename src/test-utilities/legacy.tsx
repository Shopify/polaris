import {ReactWrapper, CommonWrapper, mount} from 'enzyme';
import React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {ClientApplication} from '@shopify/app-bridge';
import {I18n, TranslationDictionary} from '../utilities/i18n';
import {get} from '../utilities/get';
import {merge} from '../utilities/merge';
import {DeepPartial} from '../types';
import translations from '../../locales/en.json';

// eslint-disable-next-line shopify/strict-component-boundaries
import {FrameContextType} from '../components/Frame';
import {createThemeContext, ThemeProviderContextType} from '../utilities/theme';
import {ScrollLockManager} from '../utilities/scroll-lock-manager';
import {StickyManager} from '../utilities/sticky-manager';
import {Link, LinkLikeComponent} from '../utilities/link';
import {PolarisTestProvider} from './PolarisTestProvider';

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
  const appBridge: any = app.appBridge;

  const wrapper = mount<P, S>(
    <PolarisTestProvider {...app} appBridge={appBridge}>
      {element}
    </PolarisTestProvider>,
  );

  return wrapper as PolarisContextReactWrapper<P, S>;
}
