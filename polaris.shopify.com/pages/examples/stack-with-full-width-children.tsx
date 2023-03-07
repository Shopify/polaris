import React from 'react';
import {Stack, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function StackWithFullWidthChildrenExample() {
  return (
    <Stack gap="4" fullWidth>
      <Placeholder label="Stack child" childWidth="100%" />
      <Placeholder />
      <Placeholder />
    </Stack>
  );
}

const Placeholder = ({
  label = '',
  height = 'auto',
  width = '100%',
  childWidth = 'auto',
}) => {
  return (
    <div
      style={{
        background: '#7B47F1',
        padding: '14px var(--p-space-2)',
        height: height ?? undefined,
        width: width ?? undefined,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          background: 'rgba(255, 255, 255, 0.3)',
          color: '#FFFFFF',
          width: childWidth ?? undefined,
        }}
      >
        <Text as="h2" variant="bodyMd" fontWeight="medium">
          {label}
        </Text>
      </div>
    </div>
  );
};

export default withPolarisExample(StackWithFullWidthChildrenExample);
