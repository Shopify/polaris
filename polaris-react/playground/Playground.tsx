import React from 'react';

import {Box, HorizontalGrid} from '../src';
import {atoms} from '../src/styles/atoms.css';

export function Playground() {
  return (
    <>
      <HorizontalGrid columns={3} gap="2">
        <div className={atoms({background: 'color-bg'})}>1</div>
        <div className={atoms({background: 'color-bg'})}>2</div>
        <div className={atoms({background: 'color-bg'})}>3</div>
        <div
          className={atoms({padding: 'space-4', background: 'color-bg-active'})}
        >
          inline atoms
        </div>
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
