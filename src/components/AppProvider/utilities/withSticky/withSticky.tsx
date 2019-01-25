import * as React from 'react';
import merge from 'lodash/merge';
import hoistStatics from 'hoist-non-react-statics';
import {WithAppProviderProps} from '../withAppProvider';
import {Context, polarisAppProviderContextTypes} from '../../types';
import StickyManager from './StickyManager';

export default function withSticky() {
  return function addStickyManager<OwnProps, C>(
    WrappedComponent:
      | React.ComponentClass<OwnProps & WithAppProviderProps> & C
      | React.SFC<OwnProps & WithAppProviderProps> & C,
  ): any & C {
    // eslint-disable-next-line shopify/react-initialize-state
    class WithStickyManager extends React.PureComponent<
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
        const {polaris} = context;
        this.polarisContext = {
          ...polaris,
          stickyManager: this.stickyManager,
        };
      }

      getChildContext(): Context {
        return {
          polaris: this.polarisContext,
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
