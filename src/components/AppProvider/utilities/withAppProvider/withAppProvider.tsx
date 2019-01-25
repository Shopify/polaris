import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import merge from 'lodash/merge';
import {ClientApplication} from '@shopify/app-bridge';
import {autobind} from '@shopify/javascript-utilities/decorators';
import Intl from '../Intl';
import Link from '../Link';
import {StickyManager} from '../withSticky';
import ScrollLockManager from '../ScrollLockManager';
import {ThemeContext} from '../../../ThemeProvider';
import {polarisAppProviderContextTypes} from '../../types';

export interface WithAppProviderProps {
  polaris: {
    intl: Intl;
    link: Link;
    stickyManager: StickyManager;
    scrollLockManager: ScrollLockManager;
    theme: ThemeContext;
    appBridge: ClientApplication<{}>;
    subscribe(callback: () => void): void;
    unsubscribe(callback: () => void): void;
  };
}

export default function withAppProvider<OwnProps>() {
  return function addProvider<C>(
    WrappedComponent:
      | React.ComponentClass<OwnProps & WithAppProviderProps> & C
      | React.SFC<OwnProps & WithAppProviderProps> & C,
  ): React.ComponentClass<OwnProps> & C {
    class WithProvider extends React.PureComponent<OwnProps, never> {
      static contextTypes = WrappedComponent.contextTypes
        ? merge(WrappedComponent.contextTypes, polarisAppProviderContextTypes)
        : polarisAppProviderContextTypes;

      componentDidMount() {
        const {
          polaris: {subscribe: subscribeToPolaris},
          polarisTheme: {subscribe: subscribeToTheme},
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
          polarisTheme: {unsubscribe: unsubscribeToTheme},
        } = this.context;

        if (unsubscribeToPolaris) {
          unsubscribeToPolaris(this.handleContextUpdate);
        }

        if (unsubscribeToTheme) {
          unsubscribeToTheme(this.handleContextUpdate);
        }
      }

      render() {
        const {polaris, polarisTheme} = this.context;
        const polarisContext = {...polaris, theme: polarisTheme};

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
