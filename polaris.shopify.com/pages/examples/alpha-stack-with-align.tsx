import React from 'react';
import {AlphaStack, Page, Inline, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithAlignExample() {
  return (
    <Page>
      <AlphaStack gap="5" fullWidth>
        <AlphaStack gap="4" align="start">
          <Placeholder width="320px" label="Start" childAlign="start" />
          <Placeholder width="320px" childAlign="start" />
          <Placeholder width="320px" childAlign="start" />
        </AlphaStack>
        <AlphaStack gap="4" align="center">
          <Placeholder width="320px" label="Center" childAlign="center" />
          <Placeholder width="320px" childAlign="center" />
          <Placeholder width="320px" childAlign="center" />
        </AlphaStack>
        <AlphaStack gap="4" align="end">
          <Placeholder width="320px" label="End" childAlign="end" />
          <Placeholder width="320px" childAlign="center" />
          <Placeholder width="320px" childAlign="center" />
        </AlphaStack>
      </AlphaStack>
    </Page>
  );
}

const Placeholder = ({
  label = '',
  height = 'auto',
  width = 'auto',
  childAlign,
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
      <Inline gap="4" align={childAlign}>
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.3)',
            color: '#FFFFFF',
          }}
        >
          <Text as="h2" variant="bodyMd" fontWeight="medium">
            {label}
          </Text>
        </div>
      </Inline>
    </div>
  );
};

export default withPolarisExample(AlphaStackWithAlignExample);
