import React from 'react';

import {Box, HorizontalGrid, Page} from '../src';
import {atoms} from '../src/styles/atoms.css';

export function Playground() {
  return (
    <Page title="Playground">
      <HorizontalGrid columns={3} gap="1">
        <div className={atoms({background: 'color-bg'})}>1</div>
        <div className={atoms({background: 'color-bg'})}>2</div>
        <div className={atoms({background: 'color-bg'})}>3</div>
        <div
          className={atoms({padding: 'space-3', background: 'color-bg-active'})}
        >
          inline atoms
        </div>
        <Box
          padding="space-3"
          background="color-bg-caution"
          color="color-text-primary"
        >
          Box with atoms
        </Box>
        <Box
          background="color-bg-critical"
          paddingInline={{xs: 'space-1', sm: 'space-3', md: 'space-6'}}
          color="color-text-primary"
        >
          Box with responsive inline padding atoms
        </Box>
      </HorizontalGrid>
    </Page>
  );
}
