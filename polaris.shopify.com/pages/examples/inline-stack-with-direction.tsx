import React from 'react';
import {BlockStack, InlineStack, Text, Divider} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithDirectionExample() {
  return (
    <BlockStack gap="1600">
      <InlineStack direction="row" align="center">
        <Placeholder width="106px" label="1" />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
      </InlineStack>
      <Divider />
      <InlineStack direction="row-reverse" align="center">
        <Placeholder width="106px" label="1" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" showBorder />
        <Placeholder width="106px" height="20px" />
      </InlineStack>
    </BlockStack>
  );
}

const Placeholder = ({
  label = '',
  height = 'auto',
  width = 'auto',
  showBorder = false,
  showBorderTop = false,
}) => {
  return (
    <div
      style={{
        padding: '6px 0',
        background: 'var(--p-color-text-info)',
        height: height,
        width: width,
        borderInlineStart: showBorder
          ? '1px dashed var(--p-color-bg-surface-success)'
          : 'none',
        borderBlockStart: showBorderTop
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

export default withPolarisExample(InlineWithDirectionExample);
