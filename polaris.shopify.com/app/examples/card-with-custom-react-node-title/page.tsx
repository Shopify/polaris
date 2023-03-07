'use client';

import {Card, LegacyStack, Icon, List, Text} from '@shopify/polaris';
import {ProductsMajor} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function CardExample() {
  return (
    <Card title="Products">
      <Card.Section
        title={
          <LegacyStack>
            <Icon source={ProductsMajor} />
            <Text variant="headingXs" as="h3">
              New Products
            </Text>
          </LegacyStack>
        }
      >
        <List>
          <List.Item>Socks</List.Item>
          <List.Item>Super Shoes</List.Item>
        </List>
      </Card.Section>
    </Card>
  );
}

export default withPolarisExample(CardExample);
