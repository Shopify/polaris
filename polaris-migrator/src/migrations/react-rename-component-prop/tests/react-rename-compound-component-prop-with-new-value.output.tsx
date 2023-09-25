import React from 'react';

declare function MyComponent(props: any): JSX.Element;
declare function CompoundComponent(props: any): JSX.Element;
declare function Child(props: any): JSX.Element;

MyComponent.CompoundComponent = CompoundComponent;

export function App() {
  return (
    <MyComponent>
      <MyComponent.CompoundComponent newProp="new-value" />
      Hello
      <Child prop="value" />
    </MyComponent>
  );
}
