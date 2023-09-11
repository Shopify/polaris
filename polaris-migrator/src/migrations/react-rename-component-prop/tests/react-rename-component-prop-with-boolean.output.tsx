import React from 'react';

declare function MyComponent(props: any): JSX.Element;

export function App() {
  return (
    <MyComponent foo="bar" variant="boolean-prop-value">
      Hello world
    </MyComponent>
  );
}
