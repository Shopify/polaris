import React from 'react';
import {Box, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithBorderRadiusExample() {
  return (
    <Box background="bg" borderRadius="1">
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
        borderRadius: 'inherit',
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

export default withPolarisExample(BoxWithBorderRadiusExample);
