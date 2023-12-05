import React from 'react';
// @ts-expect-error
import {MyComponent} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const MyComponentWrapper =
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  MyComponent;

export function App() {
  return (
    <MyComponent newProp="value" foo="bar">
      Hello
      <Child prop="value" />
      <MyComponentWrapper />
    </MyComponent>
  );
}
