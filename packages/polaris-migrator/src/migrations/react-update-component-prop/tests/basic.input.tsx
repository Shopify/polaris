import React from 'react';
// @ts-expect-error
import {MyComponent} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const MyComponentWrapper = MyComponent;

export function App() {
  return (
    <MyComponent prop="value" foo="bar">
      Hello
      <Child prop="value" />
      <MyComponentWrapper />
    </MyComponent>
  );
}
