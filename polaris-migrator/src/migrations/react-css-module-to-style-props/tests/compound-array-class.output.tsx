import React from 'react';

declare function MyComponent(props: any): JSX.Element;
export function App() {
  return (
    <MyComponent
      display="block"
      color="green"
      fontWeight="bold"
      borderRadius="4px"
    >
      Hello world
    </MyComponent>
  );
}
