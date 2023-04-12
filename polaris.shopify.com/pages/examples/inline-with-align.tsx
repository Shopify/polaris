import React from 'react';
import {VerticalStack, Inline, Text, Page, Divider} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithAlignExample() {
  return (
    <Page narrowWidth>
      <VerticalStack gap="16">
        <Inline align="start">
          <Placeholder width="106px" label="Start" />
          <Placeholder width="106px" height="20px" showBorder />
          <Placeholder width="106px" height="20px" showBorder />
          <Placeholder width="106px" height="20px" showBorder />
          <Placeholder width="106px" height="20px" showBorder />
          <Placeholder width="106px" height="20px" showBorderTop />
          <Placeholder width="106px" height="20px" showBorder />
        </Inline>
        <Divider />
        <Inline align="center">
          <Placeholder width="106px" label="Center" />
          <Placeholder width="106px" height="20px" showBorder />
          <Placeholder width="106px" height="20px" showBorder />
          <Placeholder width="106px" height="20px" showBorder />
          <Placeholder width="106px" height="20px" showBorder />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" showBorder />
        </Inline>
        <Divider />
        <Inline align="end">
          <Placeholder width="106px" label="End" />
          <Placeholder width="106px" height="20px" showBorder />
          <Placeholder width="106px" height="20px" showBorder />
          <Placeholder width="106px" height="20px" showBorder />
          <Placeholder width="106px" height="20px" showBorder />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" showBorder />
        </Inline>
      </VerticalStack>
    </Page>
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
          ? '1px dashed var(--p-color-bg-success-subdued)'
          : 'none',
        borderBlockStart: showBorderTop
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

export default withPolarisExample(InlineWithAlignExample);
