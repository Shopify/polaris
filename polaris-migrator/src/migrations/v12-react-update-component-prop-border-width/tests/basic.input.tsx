import React from 'react';
import {Box, Divider} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const BoxWrapper = Box;

export function App() {
  return (
    <>
      <Box borderWidth="1" borderRadius="3">
        Hello
        <Child borderWidth="1" />
        <BoxWrapper />
      </Box>
      <Box
        borderWidth="1-experimental"
        borderRadius="0-experimental"
        padding="100"
      >
        Hello
        <Child borderWidth="1" />
        <BoxWrapper />
      </Box>
      <Divider borderWidth="2-experimental" />
    </>
  );
}
