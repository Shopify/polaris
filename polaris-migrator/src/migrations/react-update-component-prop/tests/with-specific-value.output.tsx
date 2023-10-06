import React from 'react';
// @ts-expect-error
import {MyComponent} from '@shopify/polaris';

export function App() {
  return (
    <>
      <MyComponent foo="bar" prop="non-targeted-value">
        Hello world
      </MyComponent>
      <MyComponent foo="bar" variant="new-targeted-value">
        Hello world
      </MyComponent>
    </>
  );
}
