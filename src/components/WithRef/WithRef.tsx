import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {ReactComponent} from '@shopify/react-utilities/types';
import {NonReactStatics} from '@shopify/useful-types';
import {Consumer} from './components';

export type ComponentType<P> = React.ComponentClass<P> | React.SFC<P>;

export interface Ref<T = any> {
  ref: React.RefObject<T> | null;
}

export default function withRef<OriginalProps>() {
  return function addForwardRef<C>(
    WrappedComponent: ReactComponent<OriginalProps & Ref> & C,
  ): React.ComponentType<OriginalProps> &
    NonReactStatics<typeof WrappedComponent> {
    class WithRef extends React.Component<OriginalProps, never> {
      render() {
        return (
          <Consumer>
            {(ctx) => (
              <WrappedComponent {...this.props as any} ref={ctx.forwardedRef} />
            )}
          </Consumer>
        );
      }
    }

    const FinalComponent = hoistStatics(
      WithRef,
      WrappedComponent as React.ComponentClass<any>,
    ) as any;

    return FinalComponent;
  };
}
