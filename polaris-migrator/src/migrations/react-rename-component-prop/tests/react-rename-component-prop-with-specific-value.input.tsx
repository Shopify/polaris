import React from 'react';

declare function MyComponent(props: any): JSX.Element;

export function App() {
  return (
    <>
      <MyComponent foo="bar" prop="non-targeted-value">
        Hello world
      </MyComponent>
      <MyComponent foo="bar" prop="targeted-value">
        Hello world
      </MyComponent>
    </>
  );
}
