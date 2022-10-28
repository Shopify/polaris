import React from 'react';
import {AlphaStack, Bleed, Box, Text, Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BleedSpecificDirectionExample() {
  return (
    <AlphaStack spacing="6" fullWidth>
      <Box background="surface" border="base" padding="4">
        <Bleed top="4">
          <Placeholder label="Top" />
        </Bleed>
      </Box>
      <Box background="surface" border="base" padding="4">
        <Bleed bottom="4">
          <Placeholder label="Bottom" />
        </Bleed>
      </Box>
      <Box background="surface" border="base" padding="4">
        <Bleed left="4">
          <Placeholder label="Left" />
        </Bleed>
      </Box>
      <Box background="surface" border="base" padding="4">
        <Bleed right="4">
          <Placeholder label="Right" />
        </Bleed>
      </Box>
    </AlphaStack>
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

export default withPolarisExample(BleedSpecificDirectionExample);
