import React from 'react';
import {VerticalStack, Bleed, Box, Text, Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BleedSpecificDirectionExample() {
  return (
    <VerticalStack gap="6">
      <Box background="bg" border="base" padding="8">
        <Bleed marginInlineStart="8">
          <Placeholder label="marginInlineStart" />
        </Bleed>
      </Box>
      <Box background="bg" border="base" padding="8">
        <Bleed marginInlineEnd="8">
          <Placeholder label="marginInlineEnd" />
        </Bleed>
      </Box>
      <Box background="bg" border="base" padding="8">
        <Bleed marginBlockStart="8">
          <Placeholder label="marginBlockStart" />
        </Bleed>
      </Box>
      <Box background="bg" border="base" padding="8">
        <Bleed marginBlockEnd="8">
          <Placeholder label="marginBlockEnd" />
        </Bleed>
      </Box>
    </VerticalStack>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding: '14px var(--p-space-2)',
        height: height,
        width: width,
      }}
    >
      <Inline gap="4" align="center">
        <div
          style={{
            color: 'var(--p-color-text-on-color)',
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
