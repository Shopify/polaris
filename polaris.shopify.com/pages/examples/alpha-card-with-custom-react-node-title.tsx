import React from 'react';
import {
  AlphaCard,
  Box,
  HorizontalStack,
  Icon,
  List,
  Text,
  VerticalStack,
} from '@shopify/polaris';
import {ProductsMajor} from '@shopify/polaris-icons';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardWithCustomReactNodeTitleExample() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Products
        </Text>
        <VerticalStack inlineAlign="start" gap="0">
          <HorizontalStack gap="4">
            <Icon source={ProductsMajor} />
            <Text variant="headingSm" as="h3">
              New Products
            </Text>
          </HorizontalStack>
        </VerticalStack>
      </VerticalStack>
      <Box paddingBlockStart="2">
        <List>
          <List.Item>Socks</List.Item>
          <List.Item>Super Shoes</List.Item>
        </List>
      </Box>
    </AlphaCard>
  );
}

export default withPolarisExample(AlphaCardWithCustomReactNodeTitleExample);
