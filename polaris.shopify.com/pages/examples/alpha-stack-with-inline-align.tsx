import React from 'react';
import {AlphaStack, Page, Inline, Text, Divider} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithInlineAlignExample() {
  return (
    <Page>
      <AlphaStack gap="8">
        <AlphaStack inlineAlign="start">
          <Placeholder height="48px" width="320px" label="Start" showBorder />
          <Placeholder height="48px" width="320px" showBorder />
          <Placeholder height="48px" width="320px" showBorder />
        </AlphaStack>
        <Divider />
        <AlphaStack inlineAlign="center">
          <Placeholder height="48px" width="320px" label="Center" showBorder />
          <Placeholder height="48px" width="320px" showBorder />
          <Placeholder height="48px" width="320px" showBorder />
        </AlphaStack>
        <Divider />
        <AlphaStack inlineAlign="end">
          <Placeholder height="48px" width="320px" label="End" showBorder />
          <Placeholder height="48px" width="320px" showBorder />
          <Placeholder height="48px" width="320px" showBorder />
        </AlphaStack>
      </AlphaStack>
    </Page>
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

export default withPolarisExample(AlphaStackWithInlineAlignExample);
