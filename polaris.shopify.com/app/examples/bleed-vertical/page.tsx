'use client';

import React from 'react';
import {Bleed, Box, Text, Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function BleedVerticalExample() {
  return (
    <Box background="surface" border="base" padding="4">
      <Bleed marginInline="0" marginBlock="4">
        <Placeholder label="Vertical" />
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
        height: height,
        width: width,
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

export default withPolarisExample(BleedVerticalExample);
