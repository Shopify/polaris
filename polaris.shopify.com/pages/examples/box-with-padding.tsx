import React from 'react';
import {AlphaStack, Box, Stack, Text, Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithPaddingExample() {
  return (
    <AlphaStack>
      <Box background="surface" borderRadius="2" padding="4" width="586px">
        <Placeholder label="All side padding" childAlign="center" />
      </Box>
      <Inline spacing="4">
        <Box background="surface" paddingInlineStart="4" width="284px">
          <Placeholder label="PaddingLeft" childAlign="start" />
        </Box>
        <Box background="surface" paddingInlineEnd="4" width="284px">
          <Placeholder label="PaddingRight" childAlign="end" />
        </Box>
      </Inline>
      <Inline spacing="4">
        <Box background="surface" paddingBlockStart="4" width="284px">
          <Placeholder label="PaddingTop" childAlign="center" />
        </Box>
        <Box background="surface" paddingBlockEnd="4" width="284px">
          <Placeholder label="PaddingBottom" childAlign="center" />
        </Box>
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
      <Inline align={childAlign}>
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
