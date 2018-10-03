import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import merge from 'lodash/merge';
import Intl from '../Intl';
import Link from '../Link';
import EASDK from '../EASDK';
import {StickyManager} from '../withSticky';
import {polarisAppProviderContextTypes} from '../createPolarisContext';

export interface WithAppProviderProps {
  polaris: {intl: Intl; link: Link; easdk: EASDK; stickyManager: StickyManager};
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

      render() {
        const {polaris, easdk} = this.context;
        const polarisContext = {...polaris, easdk};

        if (!polaris) {
          throw new Error(
            `The <AppProvider> component is required as of v2.0 of Polaris React. See
            https://polaris.shopify.com/components/structure/app-provider for implementation
            instructions.`,
          );
        }

        return <WrappedComponent {...this.props} polaris={polarisContext} />;
      }
    }

    const FinalComponent = hoistStatics(
      WithProvider,
      WrappedComponent as React.ComponentClass<any>,
    );

    return FinalComponent as React.ComponentClass<OwnProps> & C;
  };
}
