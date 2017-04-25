import * as React from 'react';
import * as PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import {getDisplayName} from '@shopify/react-utilities/components';
import {ReactComponent} from '@shopify/react-utilities/types';
import EASDK from './EASDK';

interface Context {
  easdk: EASDK,
}

export interface WithEASDKProps {
  easdk: EASDK,
}

export const contextTypes = {
  easdk: PropTypes.instanceOf(EASDK),
};

export function withEASDK({displayName}: {displayName?: string} = {}) {
  return function addEASDK<OwnProps, C>(WrappedComponent: ReactComponent<OwnProps & WithEASDKProps> & C): ReactComponent<OwnProps> & C {
    class WithEASDK extends React.Component<OwnProps, never> {
      static displayName = `withEASDK(${displayName || getDisplayName(WrappedComponent)})`;
      static WrappedComponent = WrappedComponent;
      static contextTypes = contextTypes;

      context: Context;

      render() {
        // TODO: should remove the cast once https://github.com/Microsoft/TypeScript/issues/10727 is resolved
        const props = {...(this.props as any), easdk: this.context.easdk};
        return <WrappedComponent {...props} />;
      }
    }

    const FinalComponent = hoistStatics(WithEASDK, WrappedComponent as React.ComponentClass<any>);
    return FinalComponent as React.ComponentClass<OwnProps> & C;
  };
}
