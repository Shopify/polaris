import React from 'react';
// @ts-expect-error
import {MyComponent} from '@shopify/polaris';

declare const mySpreadProps: {[key: string]: any};
declare const myProp: string;

export function App() {
  return (
    <>
      <MyComponent foo="bar" prop="value">
        Hello world
      </MyComponent>
      <MyComponent foo="bar" prop="value" {...mySpreadProps}>
        Hello world
      </MyComponent>
      <MyComponent foo="bar" prop={myProp}>
        Hello world
      </MyComponent>
    </>
  );
}
