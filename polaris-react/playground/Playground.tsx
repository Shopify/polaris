import React from 'react';

import {Page, AlphaStack, Box} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      {/* Add the code you want to test in here */}
      <Box background="surface-subdued" border="dark">
        <AlphaStack
          gap="4"
          paddingBlockStart={{sm: '2', md: '6'}}
          paddingBlockEnd={{sm: '2', md: '6'}}
        >
          <Box background="surface-attention" padding="10" />
          <Box background="surface-highlight" padding="10" />
          <Box background="surface-attention" padding="10" />
        </AlphaStack>
      </Box>
    </Page>
  );
}
