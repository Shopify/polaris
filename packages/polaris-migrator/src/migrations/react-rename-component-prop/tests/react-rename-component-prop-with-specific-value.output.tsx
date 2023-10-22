import React from 'react';

declare function MyComponent(props: any): JSX.Element;

export function App() {
  return (
    <>
      <MyComponent foo="bar" variant="non-targeted-value">
        Hello world
      </MyComponent>
      <MyComponent foo="bar" variant="new-targeted-value">
        Hello world
      </MyComponent>
    </>
  );
}
