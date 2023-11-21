import {Card, Text, BlockStack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardWithVaryingPadding() {
  return (
    <BlockStack gap="400">
      <Card>
        <Placeholder label="Content inside a card" />
      </Card>
      <Card padding="400">
        <Placeholder label="Content inside a card" />
      </Card>
      <Card padding="200">
        <Placeholder label="Content inside a card" />
      </Card>
      <Card padding="0">
        <Placeholder label="Content inside a card" />
      </Card>
    </BlockStack>
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
          color: 'var(--p-color-text-info-on-bg-fill)',
        }}
      >
        <Text as="h2" variant="bodyMd" tone="text-inverse">
          {label}
        </Text>
      </div>
    </div>
  );
};

export default withPolarisExample(CardWithVaryingPadding);
