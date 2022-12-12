import React from 'react';

import {Box, Page, Divider} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <Box padding="2" background="surface-highlight">
        Padding 2
      </Box>
      <Divider />
      <Box padding="20" background="surface-attention">
        Padding 20
      </Box>
      <Divider />
      <Box padding="8" background="surface-highlight">
        Padding 8
      </Box>
      <Divider />
      <Box padding="8" paddingBlockStart="16" background="surface-attention">
        Padding 8 Padding Block Start 16
      </Box>
    </Page>
  );
}
