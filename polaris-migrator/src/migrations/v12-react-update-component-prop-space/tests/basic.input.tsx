import React from 'react';
import {Box, BlockStack} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const BoxWrapper = Box;

export function App() {
  return (
    <>
      <Box padding="1" paddingBlockStart="1_5-experimental" insetInlineEnd="0">
        Hello
        <Child padding="1" />
        <BoxWrapper />
      </Box>
      <BlockStack gap="20">
        Hello
        <Child />
        <BoxWrapper />
      </BlockStack>
    </>
  );
}
