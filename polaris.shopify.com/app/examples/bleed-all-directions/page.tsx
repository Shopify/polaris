'use client';

import React from 'react';
import {Bleed, Box, Text, Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function BleedAllDirectionsExample() {
  return (
    <Box background="surface" border="base" padding="5">
      <Bleed marginBlock="5">
        <Placeholder label="All directions" />
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
      <Inline gap="4" align="center">
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

export default withPolarisExample(BleedAllDirectionsExample);
