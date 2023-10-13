import React from 'react';
// @ts-expect-error
import {Box, Card, Divider, Banner} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const BoxWrapper =
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  Box;

export function App() {
  return (
    <>
      <Box background="bg">
        Hello
        <Child background="bg" />
        <BoxWrapper background="bg" />
      </Box>
      <Box background="bg">
        <Box outlineColor="bg" color="bg" borderColor="bg" />
        <Card background="bg" />
        <Divider borderColor="bg" />
        <Banner textColor="bg" />
      </Box>
    </>
  );
}
