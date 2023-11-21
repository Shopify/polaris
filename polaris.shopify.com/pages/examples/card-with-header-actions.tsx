import React from 'react';
import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardWithHeaderActions() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Variants
          </Text>
          <Button
            variant="plain"
            onClick={() => {}}
            accessibilityLabel="Add variant"
          >
            Add variant
          </Button>
        </InlineGrid>
        <Text as="p" variant="bodyMd">
          Add variants if this product comes in multiple versions, like
          different sizes or colors.
        </Text>
      </BlockStack>
    </Card>
  );
}

export default withPolarisExample(CardWithHeaderActions);
