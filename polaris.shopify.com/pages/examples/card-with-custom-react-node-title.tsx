import React from 'react';
import {
  BlockStack,
  Card,
  Icon,
  InlineStack,
  List,
  Text,
} from '@shopify/polaris';
import {ProductIcon} from '@shopify/polaris-icons';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardWithCustomReactNodeTitle() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Products
        </Text>
        <BlockStack inlineAlign="start">
          <InlineStack gap="400">
            <Icon source={ProductIcon} />
            <Text as="h3" variant="headingSm">
              New Products
            </Text>
          </InlineStack>
        </BlockStack>
        <List>
          <List.Item>Socks</List.Item>
          <List.Item>Super Shoes</List.Item>
        </List>
      </BlockStack>
    </Card>
  );
}

export default withPolarisExample(CardWithCustomReactNodeTitle);
