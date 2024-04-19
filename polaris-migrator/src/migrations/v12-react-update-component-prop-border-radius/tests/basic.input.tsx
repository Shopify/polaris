import React from 'react';
import {Box} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const BoxWrapper = Box;

export function App() {
  return (
    <>
      <Box borderWidth="1" borderRadius="3">
        Hello
        <Child borderRadius="1" />
        <BoxWrapper />
      </Box>
      <Box
        borderWidth="1-experimental"
        borderRadius="0-experimental"
        padding="100"
      >
        Hello
        <Child borderRadius="1" />
        <BoxWrapper />
      </Box>
    </>
  );
}
