import React from 'react';

import {Box, HorizontalGrid} from '../src';

export function Playground() {
  return (
    <>
      <HorizontalGrid columns={3} gap="2">
        <Box
          padding="space-4"
          background="color-bg-caution"
          color="color-text-primary"
        >
          Box with atoms
        </Box>
        <Box
          background="color-bg-critical"
          paddingInline={{xs: 'space-1', sm: 'space-4', md: 'space-6'}}
          color="color-text-primary"
        >
          Box with responsive inline padding atoms
        </Box>
      </HorizontalGrid>
      <HorizontalGrid columns={4} gap="2">
        <Box paddingBlockStart="space-4" background="color-bg">
          block start
        </Box>
        <Box paddingBlockEnd="space-4" background="color-bg">
          block end
        </Box>
        <Box paddingInlineStart="space-4" background="color-bg">
          inline start
        </Box>
        <Box paddingInlineEnd="space-4" background="color-bg">
          inline end
        </Box>
      </HorizontalGrid>
    </>
  );
}
