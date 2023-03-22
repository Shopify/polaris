import React from 'react';
import {AlphaStack, Box, Text, Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithPaddingExample() {
  return (
    <AlphaStack gap="4">
      <div
        style={{
          backgroundColor: 'var(--p-color-bg-info-strong)',
          width: '586px',
        }}
      >
        <Box padding="4" width="586px">
          <Placeholder label="padding" childAlign="center" />
        </Box>
      </div>
      <Inline gap="4">
        <div style={{backgroundColor: 'var(--p-color-bg-info-strong)'}}>
          <Box paddingInlineStart="4" width="284px">
            <Placeholder label="paddingInlineStart" childAlign="start" />
          </Box>
        </div>
        <div style={{backgroundColor: 'var(--p-color-bg-info-strong)'}}>
          <Box paddingInlineEnd="4" width="284px">
            <Placeholder label="paddingInlineEnd" childAlign="end" />
          </Box>
        </div>
      </Inline>
      <Inline gap="4">
        <div style={{backgroundColor: 'var(--p-color-bg-info-strong)'}}>
          <Box paddingBlockStart="4" width="284px">
            <Placeholder label="paddingBlockStart" childAlign="center" />
          </Box>
        </div>
        <div style={{backgroundColor: 'var(--p-color-bg-info-strong)'}}>
          <Box paddingBlockEnd="4" width="284px">
            <Placeholder label="paddingBlockEnd" childAlign="center" />
          </Box>
        </div>
      </Inline>
    </AlphaStack>
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
      <Inline gap="4" align={childAlign}>
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

export default withPolarisExample(BoxWithPaddingExample);
