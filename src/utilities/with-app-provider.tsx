import React, {useContext} from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {ClientApplication} from '@shopify/app-bridge';
import {PolarisContext} from '../components/types';
import {I18n, I18nContext} from './i18n';
import {Link, LinkContext} from './link';
import {
  ScrollLockManager,
  ScrollLockManagerContext,
} from './scroll-lock-manager';
import {ThemeProviderContextType, ThemeProviderContext} from './theme';
import {StickyManager, StickyManagerContext} from './sticky-manager';
import {AppBridgeContext} from './app-bridge';

export type ReactComponent<P, C> =
  | React.ComponentClass<P> & C
  | React.SFC<P> & C;

export interface WithAppProviderProps {
  polaris: {
    intl: I18n;
    link: Link;
    stickyManager: StickyManager;
    scrollLockManager: ScrollLockManager | null;
    theme?: ThemeProviderContextType;
    appBridge?: ClientApplication<{}>;
  };
}

export interface Options {
  withinScrollable?: boolean;
}

function withScrollable<P, T>(WrappedComponent: ReactComponent<P, T>) {
  class WithScrollable extends React.Component {
    static contextTypes = WrappedComponent.contextTypes;
    private stickyManager: StickyManager = new StickyManager();

    render() {
      return (
        <StickyManagerContext.Provider value={this.stickyManager}>
          <WrappedComponent {...this.props as any} />
        </StickyManagerContext.Provider>
      );
    }
  }

  return WithScrollable;
}

export function withAppProvider<OwnProps>({withinScrollable}: Options = {}) {
  return function addProvider<C>(
    WrappedComponent: ReactComponent<OwnProps & WithAppProviderProps, C>,
  ): React.ComponentClass<OwnProps> & C {
    const WithProvider: React.FunctionComponent = (props: OwnProps) => {
      const link = useContext(LinkContext);
      const theme = useContext(ThemeProviderContext);
      const intl = useContext(I18nContext);
      const scrollLockManager = useContext(ScrollLockManagerContext);
      const stickyManager = useContext(StickyManagerContext);
      const appBridge = useContext(AppBridgeContext);

      const polarisContext: PolarisContext = {
        link,
        intl,
        scrollLockManager,
        stickyManager,
        theme,
        appBridge,
      };

      if (!intl || !scrollLockManager || !stickyManager || !link || !theme) {
        throw new Error(
          `The <AppProvider> component is required as of v2.0 of Polaris React. See https://polaris.shopify.com/components/structure/app-provider for implementation instructions.`,
        );
      }

      return <WrappedComponent {...props as any} polaris={polarisContext} />;
    };
    WithProvider.contextTypes = WrappedComponent.contextTypes;

    let WithScrollable: React.ComponentClass<any> | undefined;
    if (withinScrollable) {
      WithScrollable = withScrollable(WithProvider);
    }

    const FinalComponent = hoistStatics(
      WithScrollable || WithProvider,
      WrappedComponent as React.ComponentClass<any>,
    );

    return FinalComponent as React.ComponentClass<OwnProps> & C;
  };
}
