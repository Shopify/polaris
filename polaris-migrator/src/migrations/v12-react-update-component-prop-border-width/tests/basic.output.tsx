import React from 'react';
import {Box, Divider} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const BoxWrapper =
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  Box;

export function App() {
  return (
    <>
      <Box borderWidth="025" borderRadius="3">
        Hello
        <Child borderWidth="1" />
        <BoxWrapper />
      </Box>
      <Box borderWidth="0165" borderRadius="0-experimental" padding="100">
        Hello
        <Child borderWidth="1" />
        <BoxWrapper />
      </Box>
      <Divider borderWidth="025" />
    </>
  );
}
