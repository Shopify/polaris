import React from 'react';
import {Stack, Bleed, Box, Text, Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BleedSpecificDirectionExample() {
  return (
    <Stack gap="6">
      <Box background="surface" border="base" padding="5">
        <Bleed marginBlockStart="5">
          <Placeholder label="Top" />
        </Bleed>
      </Box>
      <Box background="surface" border="base" padding="5">
        <Bleed marginBlockEnd="5">
          <Placeholder label="Bottom" />
        </Bleed>
      </Box>
      <Box background="surface" border="base" padding="5">
        <Bleed marginInlineStart="5" marginInlineEnd="0">
          <Placeholder label="Left" />
        </Bleed>
      </Box>
      <Box background="surface" border="base" padding="5">
        <Bleed marginInlineEnd="5" marginInlineStart="0">
          <Placeholder label="Right" />
        </Bleed>
      </Box>
    </Stack>
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

export default withPolarisExample(BleedSpecificDirectionExample);
