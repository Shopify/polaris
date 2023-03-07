'use client';

import React from 'react';
import {AlphaStack, Box, LegacyStack, Text, Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function BoxWithPaddingExample() {
  return (
    <AlphaStack gap="4">
      <div style={{backgroundColor: '#986BFF'}}>
        <Box padding="4" width="586px">
          <Placeholder label="All side padding" childAlign="center" />
        </Box>
      </div>
      <Inline gap="4">
        <div style={{backgroundColor: '#986BFF'}}>
          <Box paddingInlineStart="4" width="284px">
            <Placeholder label="PaddingLeft" childAlign="start" />
          </Box>
        </div>
        <div style={{backgroundColor: '#986BFF'}}>
          <Box paddingInlineEnd="4" width="284px">
            <Placeholder label="PaddingRight" childAlign="end" />
          </Box>
        </div>
      </Inline>
      <Inline gap="4">
        <div style={{backgroundColor: '#986BFF'}}>
          <Box paddingBlockStart="4" width="284px">
            <Placeholder label="PaddingTop" childAlign="center" />
          </Box>
        </div>
        <div style={{backgroundColor: '#986BFF'}}>
          <Box paddingBlockEnd="4" width="284px">
            <Placeholder label="PaddingBottom" childAlign="center" />
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
}) => {
  return (
    <div
      style={{
        background: '#7B47F1',
        height: height,
        width: width,
      }}
    >
      <Inline gap="4" align={childAlign}>
        <div
          style={{
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

export default withPolarisExample(BoxWithPaddingExample);
