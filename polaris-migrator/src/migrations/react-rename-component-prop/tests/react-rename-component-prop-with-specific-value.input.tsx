import React from 'react';

declare function MyComponent(props: any): JSX.Element;

export function App() {
  return (
    <>
      <MyComponent foo="bar" prop="non-targetted-value">
        Hello world
      </MyComponent>
      <MyComponent foo="bar" prop="targetted-value">
        Hello world
      </MyComponent>
    </>
  );
}
