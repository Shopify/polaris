import React from 'react';
import {Box} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const BoxWrapper =
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  Box;

export function App() {
  return (
    <>
      <Box background="bg-surface" padding="0">
        Hello
        <Child background="bg" />
        <BoxWrapper />
      </Box>
      <Box background="bg" padding="0">
        Hello
        <Child background="bg-app" />
        <BoxWrapper />
      </Box>
    </>
  );
}
