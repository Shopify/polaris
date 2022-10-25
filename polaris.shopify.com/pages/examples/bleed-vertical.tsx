import React from 'react';
import {Bleed, Box, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

const styles = {
  background: 'var(--p-background-selected)',
  borderRadius: 'var(--p-border-radius-05)',
  border: '1px solid var(--p-surface-dark)',
  padding: 'var(--p-space-4)',
  height: 'var(--p-space-12)',
  opacity: 0.7,
};

function BleedVerticalExample() {
  return (
    <div style={{width: '100%'}}>
      <Box background="surface" border="base" padding="4">
        <Bleed vertical="6">
          <div style={styles}>
            <Text variant="bodySm" as="h3" alignment="center" fontWeight="bold">
              vertical
            </Text>
          </div>
        </Bleed>
      </Box>
    </div>
  );
}

export default withPolarisExample(BleedVerticalExample);
