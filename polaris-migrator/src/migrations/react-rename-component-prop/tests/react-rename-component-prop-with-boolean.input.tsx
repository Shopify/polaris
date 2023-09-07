import React from 'react';

declare function MyComponent(props: any): JSX.Element;

export function App() {
  return (
    <MyComponent foo="bar" booleanProp>
      Hello world
    </MyComponent>
  );
}
