import React from 'react';
import {Box} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const BoxWrapper = Box;

export function App() {
  return (
    <>
      <Box shadow="sm" padding="0">
        Hello
        <Child shadow="sm" />
        <BoxWrapper />
        <Box shadow="border-inset-experimental" />
        <Box shadow="card-lg-experimental" />
      </Box>
    </>
  );
}
