import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Card, BlockStack, Bleed, Box, List, Text} from '@shopify/polaris';

export default {
  component: Card,
} as ComponentMeta<typeof Card>;

export function Default() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h3" variant="headingSm">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </BlockStack>
    </Card>
  );
}

export function WithResponsiveBorderRadius() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h3" variant="headingSm">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </BlockStack>
    </Card>
  );
}

export function WithResponsivePadding() {
  return (
    <Card padding={{xs: '500', sm: '600', md: '800'}} roundedAbove="sm">
      <BlockStack gap={{xs: '400', sm: '500'}}>
        <Text as="h3" variant="headingSm">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </BlockStack>
    </Card>
  );
}

export function WithSubduedBackground() {
  return (
    <Card background="bg-surface-secondary" roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h3" variant="headingSm">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </BlockStack>
    </Card>
  );
}

export function WithSubduedSection() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h3" variant="headingSm">
          Staff accounts
        </Text>
        <Box paddingBlockEnd="200">
          <List>
            <List.Item>Felix Crafford</List.Item>
            <List.Item>Ezequiel Manno</List.Item>
          </List>
        </Box>
      </BlockStack>
      <Bleed marginBlockEnd="400" marginInline="400">
        <Box background="bg-surface-secondary" padding="400">
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Deactivated staff accounts
            </Text>
            <List>
              <List.Item>Felix Crafford</List.Item>
              <List.Item>Ezequiel Manno</List.Item>
            </List>
          </BlockStack>
        </Box>
      </Bleed>
    </Card>
  );
}
