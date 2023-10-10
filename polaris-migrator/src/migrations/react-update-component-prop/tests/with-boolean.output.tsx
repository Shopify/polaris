import React from 'react';
// @ts-expect-error
import {MyComponent} from '@shopify/polaris';

export function App() {
  return (
    <MyComponent foo="bar" variant="boolean-prop-value">
      Hello world
    </MyComponent>
  );
}
