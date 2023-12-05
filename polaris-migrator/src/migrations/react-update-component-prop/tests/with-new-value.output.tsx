import React from 'react';
// @ts-expect-error
import {MyComponent} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

export function App() {
  return (
    <MyComponent newProp="new-value">
      Hello
      <Child prop="value" />
    </MyComponent>
  );
}
