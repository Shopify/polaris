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
      <Box background="bg-surface">
        Hello
        <Child background="bg" />
        <BoxWrapper background="bg" />
      </Box>
      <Box background="bg-surface-secondary">
        <Box outlineColor="border-secondary" />
        <Card background="bg-fill-magic-secondary" />
        <Box padding="500" borderColor="border-success" />
        <Divider borderColor="border-tertiary" />
        <Banner textColor="text-warning" />
        <Box color="text-emphasis-hover" />
      </Box>
    </>
  );
}
