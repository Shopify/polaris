import {Card, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardExample() {
  return (
    <Card background="bg-subdued">
      <Text as="h2" variant="bodyMd">
        Content inside a card
      </Text>
    </Card>
  );
}

export default withPolarisExample(CardExample);
