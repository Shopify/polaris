import React from 'react';
import {Bleed, Box, Text, HorizontalStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BleedVerticalExample() {
  return (
    <Box background="bg" border="base" padding="8">
      <Bleed marginBlock="8">
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
        padding: 'var(--p-space-10) var(--p-space-2)',
        height: height,
        width: width,
      }}
    >
      <HorizontalStack gap="4" align="center">
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
