import React from 'react';

declare function MyComponent(props: any): JSX.Element;

export function App() {
  return (
    <MyComponent display="flex" color="red">
      Hello world
    </MyComponent>
  );
}
