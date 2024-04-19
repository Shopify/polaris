import React from 'react';
import {Box, BlockStack} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const BoxWrapper =
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  Box;

export function App() {
  return (
    <>
      <Box padding="100" paddingBlockStart="150" insetInlineEnd="0">
        Hello
        <Child padding="1" />
        <BoxWrapper />
      </Box>
      <BlockStack gap="2000">
        Hello
        <Child />
        <BoxWrapper />
      </BlockStack>
    </>
  );
}
