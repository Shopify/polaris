import React from 'react';
import {AlphaCard, Text, VerticalStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardWithVaryingPaddingExample() {
  return (
    <VerticalStack gap="4">
      <AlphaCard roundedAbove="sm">
        <Placeholder label="Content inside a card" />
      </AlphaCard>
      <AlphaCard roundedAbove="sm" padding="4">
        <Placeholder label="Content inside a card" />
      </AlphaCard>
      <AlphaCard roundedAbove="sm" padding="2">
        <Placeholder label="Content inside a card" />
      </AlphaCard>
      <AlphaCard roundedAbove="sm" padding="0">
        <Placeholder label="Content inside a card" />
      </AlphaCard>
    </VerticalStack>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        height: height,
        width: width,
      }}
    >
      <div
        style={{
          color: 'var(--p-color-text-on-color)',
        }}
      >
        <Text as="h2" variant="bodyMd">
          {label}
        </Text>
      </div>
    </div>
  );
};

export default withPolarisExample(AlphaCardWithVaryingPaddingExample);
