declare module 'hoist-non-react-statics' {
  import {ComponentClass} from 'react';

  function hoistNonReactStatics<P>(to: ComponentClass<P>, from: ComponentClass<any>): ComponentClass<P>;
  export = hoistNonReactStatics;
}
