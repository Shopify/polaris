import React from 'react';
import {HorizontalStack, Text, VerticalStack, Divider} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithBlockAlignExample() {
  return (
    <VerticalStack gap="8">
      <HorizontalStack blockAlign="start">
        <Placeholder width="106px" label="Start" />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
      </HorizontalStack>
      <Divider />
      <HorizontalStack blockAlign="center">
        <Placeholder width="106px" label="Center" />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
      </HorizontalStack>
      <Divider />
      <HorizontalStack blockAlign="end">
        <Placeholder width="106px" label="End" />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
      </HorizontalStack>
      <Divider />
      <HorizontalStack blockAlign="baseline">
        <Placeholder width="106px" label="Baseline" />
        <Placeholder width="106px" padding="0" label="text" showBorder />
        <Placeholder width="106px" padding="0" label="text" showBorder />
        <Placeholder width="106px" padding="0" label="text" showBorder />
        <Placeholder width="106px" padding="0" label="text" showBorder />
        <Placeholder width="106px" padding="0" label="text" showBorder />
      </HorizontalStack>
      <Divider />
      <HorizontalStack blockAlign="stretch">
        <Placeholder width="106px" label="Strech" />
        <Placeholder width="106px" minHeight="20px" showBorder />
        <Placeholder width="106px" minHeight="20px" showBorder />
        <Placeholder width="106px" minHeight="20px" showBorder />
        <Placeholder width="106px" minHeight="20px" showBorder />
        <Placeholder width="106px" minHeight="20px" showBorder />
      </HorizontalStack>
    </VerticalStack>
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
      <HorizontalStack align="center">
        <div
          style={{
            color: 'var(--p-color-text-on-color)',
          }}
        >
          <Text as="h2" variant="bodyMd" fontWeight="medium">
            {label}
          </Text>
        </div>
      </HorizontalStack>
    </div>
  );
};

export default withPolarisExample(InlineWithBlockAlignExample);
