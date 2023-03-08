import React from 'react';
import {Stack, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function StackWithGapExample() {
  return (
    <SpacingBackground width="320px">
      <Stack gap="5">
        <Placeholder width="320px" label="Stack child" />
        <Placeholder width="320px" />
        <Placeholder width="320px" />
      </Stack>
    </SpacingBackground>
  );
}

const SpacingBackground = ({children, width}) => {
  return (
    <div
      style={{
        background:
          'repeating-linear-gradient(-45deg, #7B47F1, #7B47F1 1px, #E8D1FA 1px, #E8D1FA 7px)',
        width: width ?? '100%',
        height: 'auto',
      }}
    >
      {children}
    </div>
  );
};

const Placeholder = ({
  label = '',
  height = 'auto',
  width = 'auto',
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

export default withPolarisExample(StackWithGapExample);
