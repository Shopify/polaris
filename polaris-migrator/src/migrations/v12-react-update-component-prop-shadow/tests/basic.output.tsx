import React from 'react';
import {Box} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const BoxWrapper =
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  Box;

export function App() {
  return (
    <>
      <Box shadow="200" padding="0">
        Hello
        <Child shadow="sm" />
        <BoxWrapper />
        <Box shadow="border-inset" />
        <Box shadow="300" />
      </Box>
    </>
  );
}
