import React from 'react';
import {Bleed, Box, Text, Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BleedHorizontalExample() {
  return (
    <Box background="surface" border="base" padding="4">
      <Bleed vertical="4">
        <Placeholder label="Horizontal" />
      </Bleed>
    </Box>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: '#7B47F1',
        padding: '14px var(--p-space-2)',
        height: height ?? undefined,
        width: width ?? undefined,
      }}
    >
      <Inline align="center">
        <div
          style={{
            color: '#FFFFFF',
          }}
        >
          <Text as="h2" variant="bodyMd" fontWeight="regular">
            {label}
          </Text>
        </div>
      </Inline>
    </div>
  );
};

export default withPolarisExample(BleedHorizontalExample);
