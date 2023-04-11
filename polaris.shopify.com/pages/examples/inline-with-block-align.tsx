import React from 'react';
import {Inline, Text, AlphaStack, Divider} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithBlockAlignExample() {
  return (
    <AlphaStack gap="8">
      <Inline blockAlign="start">
        <Placeholder width="106px" label="Start" />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
      </Inline>
      <Divider />
      <Inline blockAlign="center">
        <Placeholder width="106px" label="Center" />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
      </Inline>
      <Divider />
      <Inline blockAlign="end">
        <Placeholder width="106px" label="End" />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
      </Inline>
      <Divider />
      <Inline blockAlign="baseline">
        <Placeholder width="106px" label="Baseline" />
        <Placeholder width="106px" padding="0" label="text" showBorder />
        <Placeholder width="106px" padding="0" label="text" showBorder />
        <Placeholder width="106px" padding="0" label="text" showBorder />
        <Placeholder width="106px" padding="0" label="text" showBorder />
        <Placeholder width="106px" padding="0" label="text" showBorder />
      </Inline>
      <Divider />
      <Inline blockAlign="stretch">
        <Placeholder width="106px" label="Strech" />
        <Placeholder width="106px" minHeight="20px" showBorder />
        <Placeholder width="106px" minHeight="20px" showBorder />
        <Placeholder width="106px" minHeight="20px" showBorder />
        <Placeholder width="106px" minHeight="20px" showBorder />
        <Placeholder width="106px" minHeight="20px" showBorder />
      </Inline>
    </AlphaStack>
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
          <Text as="h2" variant="bodyMd" fontWeight="medium">
            {label}
          </Text>
        </div>
      </Inline>
    </div>
  );
};

export default withPolarisExample(InlineWithBlockAlignExample);
