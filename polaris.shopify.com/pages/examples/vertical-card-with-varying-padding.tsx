import {AlphaCard, Text, VerticalStack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardExample() {
  return (
    <VerticalStack gap="4">
      <AlphaCard>
        <Placeholder label="Content inside a card" />
      </AlphaCard>
      <AlphaCard padding="4">
        <Placeholder label="Content inside a card" />
      </AlphaCard>
      <AlphaCard padding="2">
        <Placeholder label="Content inside a card" />
      </AlphaCard>
      <AlphaCard padding="0">
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

export default withPolarisExample(AlphaCardExample);
