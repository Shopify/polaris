import React from 'react';
import {AlphaStack, Inline, Text, Divider} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithAlignExample() {
  return (
    <>
      <Divider />
      <div style={{display: 'flex', height: '200px'}}>
        <AlphaStack gap="025" align="start">
          <Placeholder height="48px" width="320px" label="Start" />
          <Placeholder height="48px" width="320px" />
          <Placeholder height="48px" width="320px" />
        </AlphaStack>
      </div>
      <Divider />
      <div style={{display: 'flex', height: '200px'}}>
        <AlphaStack gap="025" align="center">
          <Placeholder height="48px" width="320px" label="Center" />
          <Placeholder height="48px" width="320px" />
          <Placeholder height="48px" width="320px" />
        </AlphaStack>
      </div>
      <Divider />
      <div style={{display: 'flex', height: '200px'}}>
        <AlphaStack gap="025" align="end">
          <Placeholder height="48px" width="320px" label="End" />
          <Placeholder height="48px" width="320px" />
          <Placeholder height="48px" width="320px" />
        </AlphaStack>
      </div>
      <Divider />
    </>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: '#20828D',
        padding: '14px var(--p-space-2)',
        height: height,
        width: width,
      }}
    >
      <Inline align="center">
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

export default withPolarisExample(AlphaStackWithAlignExample);
