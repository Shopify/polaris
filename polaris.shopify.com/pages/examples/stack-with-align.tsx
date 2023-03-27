import React from 'react';
import {Stack, Inline, Text, Divider} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function StackWithAlignExample() {
  return (
    <>
      <Divider />
      <div style={{display: 'flex', height: '200px'}}>
        <Stack align="start">
          <Placeholder height="48px" width="320px" label="Start" showBorder />
          <Placeholder height="48px" width="320px" showBorder />
          <Placeholder height="48px" width="320px" showBorder />
        </Stack>
      </div>
      <Divider />
      <div style={{display: 'flex', height: '200px'}}>
        <Stack align="center">
          <Placeholder height="48px" width="320px" label="Center" showBorder />
          <Placeholder height="48px" width="320px" showBorder />
          <Placeholder height="48px" width="320px" showBorder />
        </Stack>
      </div>
      <Divider />
      <div style={{display: 'flex', height: '200px'}}>
        <Stack align="end">
          <Placeholder height="48px" width="320px" label="End" showBorder />
          <Placeholder height="48px" width="320px" showBorder />
          <Placeholder height="48px" width="320px" showBorder />
        </Stack>
      </div>
      <Divider />
    </>
  );
}

const Placeholder = ({
  label = '',
  height = 'auto',
  width = 'auto',
  showBorder = false,
}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding: '14px var(--p-space-2)',
        height: height,
        width: width,
        borderBlockEnd: showBorder
          ? '1px dashed var(--p-color-bg-success-subdued)'
          : 'none',
      }}
    >
      <Inline align="center">
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

export default withPolarisExample(StackWithAlignExample);
