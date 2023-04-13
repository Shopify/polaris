import React from 'react';
import {Box, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithBorderExample() {
  return (
    <Box border="dark">
      <Placeholder label="Content inside a box" />
    </Box>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-border-interactive-subdued)',
        height: height,
        width: width,
      }}
    >
      <div
        style={{
          color: 'var(--p-color-text)',
        }}
      >
        <Text as="p" variant="bodyMd">
          {label}
        </Text>
      </div>
    </div>
  );
};

export default withPolarisExample(BoxWithBorderExample);
