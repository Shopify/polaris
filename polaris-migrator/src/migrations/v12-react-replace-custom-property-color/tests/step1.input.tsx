import React from 'react';
// @ts-expect-error
import {Box, Card, Divider, Banner} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const BoxWrapper = Box;

export function App() {
  return (
    <>
      <Box background="bg">
        Hello
        <Child background="bg" />
        <BoxWrapper background="bg" />
      </Box>
      <Box background="bg-subdued">
        <Box outlineColor="border-secondary" />
        <Card background="bg-magic" />
        <Box padding="500" borderColor="border-success-subdued" />
        <Divider borderColor="border-strong" />
        <Banner textColor="text-warning-experimental" />
        <Box color="text-interactive-hover" />
      </Box>
    </>
  );
}
