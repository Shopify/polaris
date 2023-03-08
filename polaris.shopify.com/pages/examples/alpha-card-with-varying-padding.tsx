import {AlphaCard, Text, AlphaStack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardExample() {
  return (
    <AlphaStack gap="4">
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
    </AlphaStack>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: '#7B47F1',
        height: height,
        width: width,
      }}
    >
      <div
        style={{
          color: '#FFFFFF',
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
