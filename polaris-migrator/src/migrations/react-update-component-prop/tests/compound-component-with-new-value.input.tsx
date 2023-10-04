import React from 'react';
// @ts-expect-error
import {MyComponent as MyPolarisComponent} from '@shopify/polaris';

declare function CompoundComponent(props: any): JSX.Element;
declare function Child(props: any): JSX.Element;

MyPolarisComponent.CompoundComponent = CompoundComponent;

export function App() {
  return (
    <MyPolarisComponent>
      <MyPolarisComponent.CompoundComponent prop="value" />
      Hello
      <Child prop="value" />
    </MyPolarisComponent>
  );
}
