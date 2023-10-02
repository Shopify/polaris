import React from 'react';
import {BlockStack, Box, Text, InlineStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithPaddingExample() {
  return (
    <BlockStack gap="400">
      <div
        style={{
          backgroundColor: 'var(--p-color-bg-fill-info)',
          width: '586px',
        }}
      >
        <Box padding="400" width="586px">
          <Placeholder label="padding" childAlign="center" />
        </Box>
      </div>
      <InlineStack gap="400">
        <div style={{backgroundColor: 'var(--p-color-bg-fill-info)'}}>
          <Box paddingInlineStart="400" width="284px">
            <Placeholder label="paddingInlineStart" childAlign="start" />
          </Box>
        </div>
        <div style={{backgroundColor: 'var(--p-color-bg-fill-info)'}}>
          <Box paddingInlineEnd="400" width="284px">
            <Placeholder label="paddingInlineEnd" childAlign="end" />
          </Box>
        </div>
      </InlineStack>
      <InlineStack gap="400">
        <div style={{backgroundColor: 'var(--p-color-bg-fill-info)'}}>
          <Box paddingBlockStart="400" width="284px">
            <Placeholder label="paddingBlockStart" childAlign="center" />
          </Box>
        </div>
        <div style={{backgroundColor: 'var(--p-color-bg-fill-info)'}}>
          <Box paddingBlockEnd="400" width="284px">
            <Placeholder label="paddingBlockEnd" childAlign="center" />
          </Box>
        </div>
      </InlineStack>
    </BlockStack>
  );
}

const Placeholder = ({
  label = '',
  height = 'auto',
  width = 'auto',
  childAlign,
}: {
  label?: string;
  height?: string;
  width?: string;
  childAlign: 'start' | 'center' | 'end';
}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        height: height,
        width: width,
      }}
    >
      <InlineStack gap="400" align={childAlign}>
        <div
          style={{
            color: 'var(--p-color-text-info-on-bg-fill)',
          }}
        >
          <Text as="h2" variant="bodyMd" fontWeight="medium">
            {label}
          </Text>
        </div>
      </InlineStack>
    </div>
  );
};

export default withPolarisExample(BoxWithPaddingExample);
