import * as React from 'react';
import merge from 'lodash/merge';
import hoistStatics from 'hoist-non-react-statics';
import {
  polarisAppProviderContextTypes,
  WithAppProviderProps,
} from '../../types';
import {Context} from '../../AppProvider';
import StickyManager from './StickyManager';

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
