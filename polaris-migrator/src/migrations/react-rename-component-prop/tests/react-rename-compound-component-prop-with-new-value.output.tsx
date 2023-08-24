import React from 'react';

declare function MyComponent(props: any): JSX.Element;
declare function SubComponent(props: any): JSX.Element;
declare function Child(props: any): JSX.Element;

MyComponent.SubComponent = SubComponent;

export function App() {
  return (
    <MyComponent>
      <MyComponent.SubComponent newProp="new-value" />
      Hello
      <Child prop="value" />
    </MyComponent>
  );
}
