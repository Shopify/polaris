import React from 'react';
// @ts-expect-error
import {Box, Card, Divider, Banner} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const BoxWrapper = Box;

export function App() {
  return (
    <>
      <Box background="bg-app">
        Hello
        <Child background="bg" />
        <BoxWrapper background="bg" />
      </Box>
      <Box background="bg">
        <Box outlineColor="bg-app" color="bg-app" borderColor="bg-app" />
        <Card background="bg-app" />
        <Divider borderColor="bg-app" />
        <Banner textColor="bg-app" />
      </Box>
    </>
  );
}
