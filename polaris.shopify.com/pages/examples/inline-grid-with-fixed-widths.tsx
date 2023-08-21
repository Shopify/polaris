import React from 'react';
import {InlineGrid, Text, InlineStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineGridWithFreeAndFixedWidthsExample() {
  return (
    <InlineGrid columns={['oneThird', 'twoThirds']}>
      <Placeholder height="320px" label="oneThird" />
      <Placeholder height="320px" label="twoThirds" showBorder />
    </InlineGrid>
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
        display: 'inherit',
        background: 'var(--p-color-text-info)',
        height: height ?? undefined,
        width: width ?? undefined,
        borderInlineStart: showBorder
          ? '1px dashed var(--p-color-bg-success-subdued)'
          : 'none',
      }}
    >
      <InlineStack gap="4" align="center" blockAlign="center">
        <div
          style={{
            color: 'var(--p-color-text-on-color)',
            width: width ?? undefined,
          }}
        >
          <Text as="h2" variant="bodyMd" fontWeight="medium" alignment="center">
            {label}
          </Text>
        </div>
      </InlineStack>
    </div>
  );
};

export default withPolarisExample(InlineGridWithFreeAndFixedWidthsExample);
