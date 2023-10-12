import React from 'react';
import {Box} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const BoxWrapper = Box;

export function App() {
  return (
    <>
      <Box background="bg" padding="0">
        Hello
        <Child background="bg" />
        <BoxWrapper />
      </Box>
      <Box background="bg-app" padding="0">
        Hello
        <Child background="bg-app" />
        <BoxWrapper />
      </Box>
    </>
  );
}
