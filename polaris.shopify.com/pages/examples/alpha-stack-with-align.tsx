import React from 'react';
import {AlphaStack, Box, Page, Inline, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

type Align = 'start' | 'end' | 'center';

export interface PlaceholderProps {
  label?: string;
  height?: string;
  width?: string;
  childAlign?: Align;
}

const Placeholder = ({
  label,
  height,
  width,
  childAlign = 'start',
}: PlaceholderProps) => {
  return (
    <div
      style={{
        background: 'var(--surface-example-block)',
        padding: '14px var(--p-space-2)',
        height: height ?? undefined,
        width: width ?? undefined,
      }}
    >
      <Inline align={childAlign}>
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.3)',
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

function AlphaStackWithAlignExample() {
  return (
    <Page>
      <Box paddingBottom="20">
        <AlphaStack align="start">
          <Placeholder width="320px" label="Start" childAlign="start" />
          <Placeholder width="320px" />
          <Placeholder width="320px" />
        </AlphaStack>
      </Box>
      <Box paddingBottom="20">
        <AlphaStack align="center">
          <AlphaStack>
            <Placeholder width="320px" label="Center" childAlign="center" />
            <Placeholder width="320px" />
            <Placeholder width="320px" />
          </AlphaStack>
        </AlphaStack>
      </Box>
      <Box>
        <AlphaStack align="end">
          <Placeholder width="320px" label="End" childAlign="end" />
          <Placeholder width="320px" />
          <Placeholder width="320px" />
        </AlphaStack>
      </Box>
    </Page>
  );
}

export default withPolarisExample(AlphaStackWithAlignExample);
