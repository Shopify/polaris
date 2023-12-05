import React from 'react';
import {InlineStack, Text, BlockStack, Divider} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithBlockAlignExample() {
  return (
    <BlockStack gap="800">
      <InlineStack blockAlign="start">
        <Placeholder width="106px" label="Start" />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
      </InlineStack>
      <Divider />
      <InlineStack blockAlign="center">
        <Placeholder width="106px" label="Center" />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
      </InlineStack>
      <Divider />
      <InlineStack blockAlign="end">
        <Placeholder width="106px" label="End" />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
      </InlineStack>
      <Divider />
      <InlineStack blockAlign="baseline">
        <Placeholder width="106px" label="Baseline" />
        <Placeholder width="106px" padding="0" label="text" showBorder />
        <Placeholder width="106px" padding="0" label="text" showBorder />
        <Placeholder width="106px" padding="0" label="text" showBorder />
        <Placeholder width="106px" padding="0" label="text" showBorder />
        <Placeholder width="106px" padding="0" label="text" showBorder />
      </InlineStack>
      <Divider />
      <InlineStack blockAlign="stretch">
        <Placeholder width="106px" label="Stretch" />
        <Placeholder width="106px" minHeight="20px" showBorder />
        <Placeholder width="106px" minHeight="20px" showBorder />
        <Placeholder width="106px" minHeight="20px" showBorder />
        <Placeholder width="106px" minHeight="20px" showBorder />
        <Placeholder width="106px" minHeight="20px" showBorder />
      </InlineStack>
    </BlockStack>
  );
}

const Placeholder = ({
  label = '',
  height = 'auto',
  width = 'auto',
  minHeight = 'auto',
  padding = '6px 0px',
  showBorder = false,
}) => {
  return (
    <div
      style={{
        padding: padding,
        background: 'var(--p-color-text-info)',
        height: height,
        width: width,
        minHeight: minHeight,
        borderInlineStart: showBorder
          ? '1px dashed var(--p-color-bg-surface-success)'
          : 'none',
      }}
    >
      <InlineStack align="center">
        <div
          style={{
            color: 'var(--p-color-text-info-on-bg-fill)',
          }}
        >
          <Text
            as="h2"
            variant="bodyMd"
            fontWeight="medium"
            tone="text-inverse"
          >
            {label}
          </Text>
        </div>
      </InlineStack>
    </div>
  );
};

export default withPolarisExample(InlineWithBlockAlignExample);
