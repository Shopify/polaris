import {Card, Text, AlphaStack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardExample() {
  return (
    <AlphaStack gap="4" fullWidth>
      <Card>
        <Placeholder label="Content inside a card" />
      </Card>
      <Card padding="4">
        <Placeholder label="Content inside a card" />
      </Card>
      <Card padding="2">
        <Placeholder label="Content inside a card" />
      </Card>
      <Card padding="0">
        <Placeholder label="Content inside a card" />
      </Card>
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

export default withPolarisExample(CardExample);
