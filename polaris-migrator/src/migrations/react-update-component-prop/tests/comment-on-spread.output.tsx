import React from 'react';

declare function MyComponent(props: any): JSX.Element;
declare const myProps: {baz: string};

export function App() {
  return (
    /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
    <MyComponent foo="bar" {...myProps}>
      Hello world
    </MyComponent>
  );
}
