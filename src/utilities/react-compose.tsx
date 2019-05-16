import React from 'react';
import {ReactComponent} from '@shopify/react-utilities/types';
import reactCompose from '@shopify/react-compose';
import {NonReactStatics} from '@shopify/useful-types';
// eslint-disable-next-line shopify/strict-component-boundaries
import {Provider as RefProvider} from '../components/WithRef';

export type ComponentClass = React.ComponentClass<any>;

export type WrappingFunction = (
  Component: ReactComponent<any>,
) => ReactComponent<any>;

export default function compose<Props>(
  ...wrappingFunctions: WrappingFunction[]
) {
  return function wrapComponent<ComposedProps, C>(
    OriginalComponent: ReactComponent<ComposedProps> & C,
  ): ReactComponent<Props> & NonReactStatics<typeof OriginalComponent> {
    const Result = reactCompose(...wrappingFunctions)(
      OriginalComponent,
    ) as ReactComponent<ComposedProps>;
    // eslint-disable-next-line react/display-name
    return (React.forwardRef<Props>((props: any, ref: React.RefObject<any>) => {
      return (
        <RefProvider value={{forwardedRef: ref}}>
          <Result {...props} />
        </RefProvider>
      );
    }) as unknown) as ReactComponent<Props> &
      NonReactStatics<typeof OriginalComponent>;
  };
}
