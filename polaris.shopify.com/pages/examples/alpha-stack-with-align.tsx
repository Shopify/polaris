import React from 'react';
import {AlphaStack, Page, Inline, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithAlignExample() {
  return (
    <Page>
      <AlphaStack gap="5" fullWidth>
        <AlphaStack align="start">
          <Placeholder width="320px" label="Start" childAlign="start" />
          <Placeholder width="320px" childAlign="start" />
          <Placeholder width="320px" childAlign="start" />
        </AlphaStack>

        <AlphaStack align="center">
          <AlphaStack>
            <Placeholder width="320px" label="Center" childAlign="center" />
            <Placeholder width="320px" childAlign="center" />
            <Placeholder width="320px" childAlign="center" />
          </AlphaStack>
        </AlphaStack>
        <AlphaStack align="end">
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
      <Inline align={childAlign}>
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
