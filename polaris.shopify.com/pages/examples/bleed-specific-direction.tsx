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

function BleedSpecificDirectionExample() {
  return (
    <div style={{width: '500px'}}>
      <Box background="surface" border="base" padding="4">
        <Bleed top="6">
          <div style={styles}>
            <Text variant="bodySm" as="h3" alignment="center" fontWeight="bold">
              top
            </Text>
          </div>
        </Bleed>
      </Box>
      <br />
      <Box background="surface" border="base" padding="4">
        <Bleed right="6">
          <div style={styles}>
            <Text variant="bodySm" as="h3" alignment="center" fontWeight="bold">
              right
            </Text>
          </div>
        </Bleed>
      </Box>
      <br />
      <Box background="surface" border="base" padding="4">
        <Bleed left="6">
          <div style={styles}>
            <Text variant="bodySm" as="h3" alignment="center" fontWeight="bold">
              left
            </Text>
          </div>
        </Bleed>
      </Box>
      <br />
      <Box background="surface" border="base" padding="4">
        <Bleed bottom="6">
          <div style={styles}>
            <Text variant="bodySm" as="h3" alignment="center" fontWeight="bold">
              bottom
            </Text>
          </div>
        </Bleed>
      </Box>
      <br />
    </div>
  );
}

export default withPolarisExample(BleedSpecificDirectionExample);
