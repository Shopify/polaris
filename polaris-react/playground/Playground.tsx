import React from 'react';

import {Box, Page, Divider} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <Box padding="8" background="surface-attention">
        Padding 8
      </Box>

      <Divider />
      <Box
        padding={{xs: '2', sm: '16', md: '32'}}
        background="surface-highlight"
      >
        Padding xs: '2', sm: '16', md: '32'
      </Box>
    </Page>
  );
}
