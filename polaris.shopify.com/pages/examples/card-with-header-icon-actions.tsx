import React from 'react';
import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';
import {ExportIcon} from '@shopify/polaris-icons';

function CardWithHeaderIconActions() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Variants
          </Text>
          <Button
            onClick={() => {}}
            accessibilityLabel="Export variants"
            icon={ExportIcon}
          />
        </InlineGrid>
        <Text as="p" variant="bodyMd">
          Export variants
        </Text>
      </BlockStack>
    </Card>
  );
}

export default withPolarisExample(CardWithHeaderIconActions);
