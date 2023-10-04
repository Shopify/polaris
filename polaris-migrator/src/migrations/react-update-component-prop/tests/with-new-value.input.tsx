import React from 'react';

declare function MyComponent(props: any): JSX.Element;
declare function Child(props: any): JSX.Element;

export function App() {
  return (
    <MyComponent prop="value">
      Hello
      <Child prop="value" />
    </MyComponent>
  );
}
