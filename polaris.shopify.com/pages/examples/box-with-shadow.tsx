import React from 'react';
import {Box, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithShadowExample() {
  return (
    <Box shadow="md">
      <Placeholder label="Content inside a box" />
    </Box>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        height: height,
        width: width,
      }}
    >
      <div
        style={{
          color: 'var(--p-color-text-on-color)',
        }}
      >
        <Text as="p" variant="bodyMd">
          {label}
        </Text>
      </div>
    </div>
  );
};

export default withPolarisExample(BoxWithShadowExample);
