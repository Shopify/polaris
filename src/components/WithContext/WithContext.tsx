import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {WithContextTypes} from '../../types';

export default function withContext<InjectedProps>(
  Consumer: React.ComponentType,
) {
  return function addContext<OriginalProps>(
    WrappedComponent:
      | React.ComponentClass<OriginalProps & WithContextTypes<InjectedProps>>
      | React.SFC<OriginalProps & WithContextTypes<InjectedProps>>,
  ): React.ComponentClass<OriginalProps> {
    // eslint-disable-next-line react/prefer-stateless-function
    class WithContext extends React.Component<
      OriginalProps & WithContextTypes<InjectedProps>,
      never
    > {
      render() {
        return (
          <Consumer>
            {/* https://github.com/Microsoft/TypeScript/issues/10727 */}
            {(ctx: InjectedProps & any) => {
              const {context, ...rest} = this.props as any;
              return (
                <WrappedComponent {...rest} context={{...context, ...ctx}} />
              );
            }}
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
