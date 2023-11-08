import {LegacyCard, LegacyStack, Icon, List, Text} from '@shopify/polaris';
import {ProductsIcon} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LegacyCardExample() {
  return (
    <LegacyCard title="Products">
      <LegacyCard.Section
        title={
          <LegacyStack>
            <Icon source={ProductsIcon} />
            <Text variant="headingSm" as="h3">
              New Products
            </Text>
          </LegacyStack>
        }
      >
        <List>
          <List.Item>Socks</List.Item>
          <List.Item>Super Shoes</List.Item>
        </List>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export default withPolarisExample(LegacyCardExample);
