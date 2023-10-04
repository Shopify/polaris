import React from 'react';

declare function MyComponent(props: any): JSX.Element;
declare const myProps: {baz: string};

export function App() {
  return (
    <MyComponent foo="bar" {...myProps}>
      Hello world
    </MyComponent>
  );
}
