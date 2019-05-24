import * as React from 'react';
import reactCompose from '@shopify/react-compose';
import {NonReactStatics} from '@shopify/useful-types';
// eslint-disable-next-line shopify/strict-component-boundaries
import {Provider as RefProvider} from '../components/WithRef';

export type ComponentClass = React.ComponentClass<any>;

export type WrappingFunction = (
  Component: React.ComponentType<any>,
) => React.ComponentType<any>;

export default function compose<Props>(
  ...wrappingFunctions: WrappingFunction[]
) {
  return function wrapComponent<ComposedProps, C>(
    OriginalComponent: React.ComponentType<ComposedProps> & C,
  ): React.ComponentType<Props> & NonReactStatics<typeof OriginalComponent> {
    const Result = reactCompose(...wrappingFunctions)(
      OriginalComponent,
    ) as React.ComponentType<ComposedProps>;
    // eslint-disable-next-line react/display-name
    return (React.forwardRef<Props>((props: any, ref: React.RefObject<any>) => {
      return (
        <RefProvider value={{forwardedRef: ref}}>
          <Result {...props} />
        </RefProvider>
      );
    }) as unknown) as React.ComponentType<Props> &
      NonReactStatics<typeof OriginalComponent>;
  };
}
