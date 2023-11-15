import React from 'react';
import {BlockStack, Box, Text, InlineStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithPaddingExample() {
  return (
    <BlockStack gap="400">
      <div
        style={{
          width: '586px',
        }}
      >
        <Box padding="400" width="586px" background="bg-fill-info">
          <Placeholder label="padding" childAlign="center" />
        </Box>
      </div>
      <InlineStack gap="400">
        <Box paddingInline="400" width="586px" background="bg-fill-info">
          <Placeholder label="paddingInline" childAlign="center" />
        </Box>
        <Box paddingInlineStart="400" width="284px" background="bg-fill-info">
          <Placeholder label="paddingInlineStart" childAlign="start" />
        </Box>
        <Box paddingInlineEnd="400" width="284px" background="bg-fill-info">
          <Placeholder label="paddingInlineEnd" childAlign="end" />
        </Box>
      </InlineStack>
      <InlineStack gap="400">
        <Box paddingBlock="400" width="586px" background="bg-fill-info">
          <Placeholder label="paddingBlock" childAlign="center" />
        </Box>
        <Box paddingBlockStart="400" width="284px" background="bg-fill-info">
          <Placeholder label="paddingBlockStart" childAlign="center" />
        </Box>
        <Box paddingBlockEnd="400" width="284px" background="bg-fill-info">
          <Placeholder label="paddingBlockEnd" childAlign="center" />
        </Box>
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

export default withPolarisExample(BoxWithPaddingExample);
