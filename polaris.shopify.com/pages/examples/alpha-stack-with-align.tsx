import React from 'react';
import {AlphaStack, Page, Inline, Text, Divider} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithAlignExample() {
  return (
    <Page>
      <AlphaStack gap="8" fullWidth>
        <AlphaStack align="start">
          <Placeholder height="48px" width="320px" label="Start" />
          <Placeholder height="48px" width="320px" showBorder />
          <Placeholder height="48px" width="320px" showBorder />
        </AlphaStack>
        <Divider />
        <AlphaStack align="center">
          <Placeholder height="48px" width="320px" label="Center" />
          <Placeholder height="48px" width="320px" showBorder />
          <Placeholder height="48px" width="320px" showBorder />
        </AlphaStack>
        <Divider />
        <AlphaStack align="end">
          <Placeholder height="48px" width="320px" label="End" />
          <Placeholder height="48px" width="320px" showBorder />
          <Placeholder height="48px" width="320px" showBorder />
        </AlphaStack>
      </AlphaStack>
    </Page>
  );
}

const Placeholder = ({
  label = '',
  height = 'auto',
  width = 'auto',
  showBorder = false,
}) => {
  return (
    <div
      style={{
        background: '#20828D',
        padding: '14px var(--p-space-2)',
        height: height,
        width: width,
        borderBlockStart: showBorder ? '1px dashed #EAFAF3' : 'none',
      }}
    >
      <Inline align="center">
        <div
          style={{
            color: '#FFFFFF',
          }}
        >
          <Text as="h2" variant="bodyMd" fontWeight="regular">
            {label}
          </Text>
        </div>
      </Inline>
    </div>
  );
};

export default withPolarisExample(AlphaStackWithAlignExample);
