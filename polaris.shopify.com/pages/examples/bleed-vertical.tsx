import React from 'react';
import {Bleed, Box, Text, HorizontalStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BleedVerticalExample() {
  return (
    <Box
      background="bg"
      borderColor="border-subdued"
      borderWidth="1"
      padding="800"
    >
      <Bleed marginBlock="800">
        <Placeholder label="marginBlock" />
      </Bleed>
    </Box>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding: 'var(--p-space-1000) var(--p-space-200)',
        height: height,
        width: width,
      }}
    >
      <HorizontalStack gap="400" align="center">
        <div
          style={{
            color: 'var(--p-color-text-on-color)',
          }}
        >
          <Text as="h2" variant="bodyMd" fontWeight="regular">
            {label}
          </Text>
        </div>
      </HorizontalStack>
    </div>
  );
};

export default withPolarisExample(BleedVerticalExample);
