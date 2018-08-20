import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import get from 'lodash/get';
import merge from 'lodash/merge';
import replace from 'lodash/replace';
import hoistStatics from 'hoist-non-react-statics';
import {autobind} from '@shopify/javascript-utilities/decorators';

import {
  polarisAppProviderContextTypes,
  TranslationDictionary,
  PrimitiveReplacementDictionary,
  ComplexReplacementDictionary,
  WithAppProviderProps,
  CreateAppProviderContext,
} from '../types';
import {PolarisContext} from '../../types';

import Intl from '../Intl';
import Link from '../Link';
import {Context} from '../AppProvider';
import EASDK from '../EASDK';
import StickyManager from '../StickyManager';
import ScrollLockManager from '../ScrollLockManager';
import {
  createThemeContext,
  ThemeContext as CreateThemeContext,
} from '../../ThemeProvider';

import packageJSON from '../../../../package.json';

const METADATA = {
  interface: {
    name: packageJSON.name,
    version: packageJSON.version,
  },
};

const REPLACE_REGEX = /{([^}]*)}/g;

export function translate(
  id: string,
  translations: TranslationDictionary | TranslationDictionary[] | undefined,
  replacements?: PrimitiveReplacementDictionary | ComplexReplacementDictionary,
) {
  const text = get(translations, id) as string;

  if (!text) {
    return '';
  }

  if (replacements) {
    return replace(text, REPLACE_REGEX, (match: string) => {
      const replacement: string = match.substring(1, match.length - 1);

      if (!replacements.hasOwnProperty(replacement)) {
        throw new Error(
          `No replacement found for key '${replacement}'. The following replacements were passed: ${Object.keys(
            replacements,
          )
            .map((key) => `'${key}'`)
            .join(', ')}`,
        );
      }

      return replacements[replacement] as string;
    });
  }

  return text;
}

export function withAppProvider<OwnProps>() {
  return function addProvider<C>(
    WrappedComponent:
      | React.ComponentClass<OwnProps & WithAppProviderProps> & C
      | React.SFC<OwnProps & WithAppProviderProps> & C,
  ): React.ComponentClass<OwnProps> & C {
    // eslint-disable-next-line react/prefer-stateless-function
    class WithProvider extends React.Component<OwnProps, never> {
      static contextTypes = WrappedComponent.contextTypes
        ? merge(WrappedComponent.contextTypes, polarisAppProviderContextTypes)
        : polarisAppProviderContextTypes;

      componentDidMount() {
        const {
          polaris: {subscribe: subscribeToPolaris},
          theme: {subscribe: subscribeToTheme},
        } = this.context;

        if (subscribeToPolaris) {
          subscribeToPolaris(this.handleContextUpdate);
        }

        if (subscribeToTheme) {
          subscribeToTheme(this.handleContextUpdate);
        }
      }

      componentWillUnmount() {
        const {
          polaris: {unsubscribe: unsubscribeToPolaris},
          theme: {unsubscribe: unsubscribeToTheme},
        } = this.context;

        if (unsubscribeToPolaris) {
          unsubscribeToPolaris(this.handleContextUpdate);
        }

        if (unsubscribeToTheme) {
          unsubscribeToTheme(this.handleContextUpdate);
        }
      }

      render() {
        const {polaris, easdk, theme} = this.context;
        const polarisContext = {...polaris, easdk, theme};

        if (!polaris) {
          throw new Error(
            `The <AppProvider> component is required as of v2.0 of Polaris React. See
            https://polaris.shopify.com/components/structure/app-provider for implementation
            instructions.`,
          );
        }

        return <WrappedComponent {...this.props} polaris={polarisContext} />;
      }

      @autobind
      private handleContextUpdate() {
        this.forceUpdate();
      }
    }

    const FinalComponent = hoistStatics(
      WithProvider,
      WrappedComponent as React.ComponentClass<any>,
    );
    return FinalComponent as React.ComponentClass<OwnProps> & C;
  };
}

export function withSticky() {
  return function addStickyManager<OwnProps, C>(
    WrappedComponent:
      | React.ComponentClass<OwnProps & WithAppProviderProps> & C
      | React.SFC<OwnProps & WithAppProviderProps> & C,
  ): any & C {
    class WithStickyManager extends React.Component<
      {},
      OwnProps & WithAppProviderProps
    > {
      static childContextTypes = polarisAppProviderContextTypes;
      static contextTypes = WrappedComponent.contextTypes
        ? merge(WrappedComponent.contextTypes, polarisAppProviderContextTypes)
        : polarisAppProviderContextTypes;

      private stickyManager: StickyManager = new StickyManager();
      private polarisContext: any;

      constructor(props: OwnProps & WithAppProviderProps, context: Context) {
        super(props);
        const {polaris, easdk} = context;
        this.polarisContext = {
          ...polaris,
          stickyManager: this.stickyManager,
          easdk,
        };
      }

      getChildContext(): Context {
        const {easdk, ...rest} = this.polarisContext;
        return {
          polaris: rest,
          easdk,
        };
      }

      render() {
        return (
          <WrappedComponent {...this.props} polaris={this.polarisContext} />
        );
      }
    }

    const FinalComponent = hoistStatics(
      WithStickyManager,
      WrappedComponent as React.ComponentClass<any>,
    );
    return FinalComponent as React.ComponentClass<any> & C;
  };
}

export function createAppProviderContext({
  i18n,
  linkComponent,
  apiKey,
  shopOrigin,
  forceRedirect,
  debug,
  stickyManager,
  scrollLockManager,
  subscribe = noop,
  unsubscribe = noop,
}: CreateAppProviderContext = {}): Context {
  const intl = new Intl(i18n);
  const link = new Link(linkComponent);
  const easdk =
    apiKey && shopOrigin
      ? new EASDK(
          {
            apiKey,
            shopOrigin,
            forceRedirect,
            debug,
          },
          METADATA,
        )
      : undefined;

  return {
    polaris: {
      intl,
      link,
      stickyManager: stickyManager || new StickyManager(),
      scrollLockManager: scrollLockManager || new ScrollLockManager(),
      subscribe,
      unsubscribe,
    },
    easdk,
  };
}

export function createPolarisContext(): PolarisContext;
export function createPolarisContext(
  contextOne: CreateAppProviderContext | CreateThemeContext,
): PolarisContext;
export function createPolarisContext(
  contextOne: CreateAppProviderContext | CreateThemeContext,
  contextTwo: CreateAppProviderContext | CreateThemeContext,
): PolarisContext;
export function createPolarisContext(
  contextOne?: CreateAppProviderContext | CreateThemeContext,
  contextTwo?: CreateAppProviderContext | CreateThemeContext,
) {
  let appProviderContext: CreateAppProviderContext | undefined;
  let themeContext: CreateThemeContext | undefined;
  if (contextOne && 'logo' in contextOne) {
    themeContext = contextOne as CreateThemeContext;
    appProviderContext = contextTwo;
  } else {
    appProviderContext = contextOne;
    themeContext = contextTwo as CreateThemeContext | undefined;
  }

  const appProvider = appProviderContext
    ? createAppProviderContext(appProviderContext)
    : createAppProviderContext();
  const theme = themeContext
    ? createThemeContext(themeContext)
    : createThemeContext();

  return {...appProvider, ...theme};
}
