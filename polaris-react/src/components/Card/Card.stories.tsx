import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Card,
  BlockStack,
  Bleed,
  Box,
  Divider,
  List,
  Text,
} from '@shopify/polaris';

export default {
  component: Card,
} as ComponentMeta<typeof Card>;

export function Default() {
  return (
    <Card>
      <BlockStack gap="500">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </BlockStack>
    </Card>
  );
}

export function WithBackgroundSubdued() {
  return (
    <Card background="bg-secondary-experimental">
      <BlockStack gap="500">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </BlockStack>
    </Card>
  );
}

export function WithBorderRadiusRoundedAbove() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="500">
        <Text as="h3" variant="headingMd">
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
        <Text as="h3" variant="headingMd">
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
      <BlockStack gap="500">
        <Text as="h3" variant="headingMd">
          Staff accounts
        </Text>
        <Box paddingBlockEnd="500">
          <List>
            <List.Item>Felix Crafford</List.Item>
            <List.Item>Ezequiel Manno</List.Item>
          </List>
        </Box>
      </BlockStack>
      <Bleed
        marginBlockEnd={{xs: '400', sm: '500'}}
        marginInline={{xs: '400', sm: '500'}}
      >
        <Divider />
        <Box
          background="bg-secondary-experimental"
          padding={{xs: '400', sm: '500'}}
        >
          <BlockStack gap="200">
            <Text variant="headingSm" as="h3">
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
