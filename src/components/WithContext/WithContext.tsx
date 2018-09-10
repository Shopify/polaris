import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {WithContextTypes} from '../../types';

export default function withContext<
  OriginalProps,
  ExternalProps,
  InjectedProps
>(Consumer: React.ComponentType) {
  return function addContext(
    WrappedComponent:
      | React.ComponentClass<
          OriginalProps & ExternalProps & WithContextTypes<InjectedProps>
        >
      | React.SFC<
          OriginalProps & ExternalProps & WithContextTypes<InjectedProps>
        >,
  ): React.ComponentClass<OriginalProps> {
    // eslint-disable-next-line react/prefer-stateless-function
    class WithContext extends React.Component<
      OriginalProps & WithContextTypes<InjectedProps>,
      never
    > {
      render() {
        return (
          <Consumer>
            {(context: InjectedProps) => (
              <WrappedComponent {...this.props} context={context} />
            )}
          </Consumer>
        );
      }
    }

    const FinalComponent = hoistStatics(
      WithContext,
      WrappedComponent as React.ComponentClass<any>,
    );

    return FinalComponent as React.ComponentClass<OriginalProps>;
  };
}
