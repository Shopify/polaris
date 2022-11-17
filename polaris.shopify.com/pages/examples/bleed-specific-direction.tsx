import React from 'react';
import {AlphaStack, Bleed, Box, Text, Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BleedSpecificDirectionExample() {
  return (
    <AlphaStack gap="6" fullWidth>
      <Box background="surface" border="base" padding="4">
        <Bleed horizontal="0" top="4">
          <Placeholder label="Top" />
        </Bleed>
      </Box>
      <Box background="surface" border="base" padding="4">
        <Bleed horizontal="0" bottom="4">
          <Placeholder label="Bottom" />
        </Bleed>
      </Box>
      <Box background="surface" border="base" padding="4">
        <Bleed horizontal="0" left="4">
          <Placeholder label="Left" />
        </Bleed>
      </Box>
      <Box background="surface" border="base" padding="4">
        <Bleed horizontal="0" right="4">
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

export default withPolarisExample(BleedSpecificDirectionExample);
