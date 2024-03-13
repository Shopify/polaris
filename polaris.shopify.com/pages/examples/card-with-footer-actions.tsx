import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  List,
  Text,
} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';
import {PlusIcon} from '@shopify/polaris-icons';

function CardWithFooterActions() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Shipment 1234
        </Text>
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Items
          </Text>
          <List>
            <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
            <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
          </List>
        </BlockStack>
        <InlineStack align="end">
          <ButtonGroup>
            <Button onClick={() => {}} accessibilityLabel="Fulfill items">
              Fulfill items
            </Button>
            <Button
              icon={PlusIcon}
              variant="primary"
              onClick={() => {}}
              accessibilityLabel="Create shipping label"
            >
              Create shipping label
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}

export default withPolarisExample(CardWithFooterActions);
