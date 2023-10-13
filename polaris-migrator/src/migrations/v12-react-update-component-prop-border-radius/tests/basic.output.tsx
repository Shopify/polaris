import React from 'react';
import {Box} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const BoxWrapper =
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  Box;

export function App() {
  return (
    <>
      <Box borderWidth="1" borderRadius="300">
        Hello
        <Child borderRadius="1" />
        <BoxWrapper />
      </Box>
      <Box borderWidth="1-experimental" borderRadius="0" padding="100">
        Hello
        <Child borderRadius="1" />
        <BoxWrapper />
      </Box>
    </>
  );
}
