import React from 'react';
import {Stack, Box, Text, Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithPaddingExample() {
  return (
    <Stack gap="4">
      <div style={{backgroundColor: '#2AACBB', width: '586px'}}>
        <Box padding="4" width="586px">
          <Placeholder label="padding" childAlign="center" />
        </Box>
      </div>
      <Inline gap="4">
        <div style={{backgroundColor: '#2AACBB'}}>
          <Box paddingInlineStart="4" width="284px">
            <Placeholder label="paddingInlineStart" childAlign="start" />
          </Box>
        </div>
        <div style={{backgroundColor: '#2AACBB'}}>
          <Box paddingInlineEnd="4" width="284px">
            <Placeholder label="paddingInlineEnd" childAlign="end" />
          </Box>
        </div>
      </Inline>
      <Inline gap="4">
        <div style={{backgroundColor: '#2AACBB'}}>
          <Box paddingBlockStart="4" width="284px">
            <Placeholder label="paddingBlockStart" childAlign="center" />
          </Box>
        </div>
        <div style={{backgroundColor: '#2AACBB'}}>
          <Box paddingBlockEnd="4" width="284px">
            <Placeholder label="paddingBlockEnd" childAlign="center" />
          </Box>
        </div>
      </Inline>
    </Stack>
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
        background: '#20828D',
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
