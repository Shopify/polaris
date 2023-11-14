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
    <Card background="bg-surface-tertiary">
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
        <Box background="bg-surface-tertiary" padding={{xs: '400', sm: '500'}}>
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

export function FullWindowWidth() {
  return (
    <BlockStack gap="400">
      <Bleed marginInline="400">
        <Card>Card with same width as window</Card>
      </Bleed>
      <Bleed marginInline="400">
        <Card roundedAbove="sm">
          Card with roundedAbove sm and same width as window
        </Card>
      </Bleed>
      <Card>Card with smaller width than window</Card>
      <Card roundedAbove="md">
        Card with roundedAbove md and smaller width than window
      </Card>
    </BlockStack>
  );
}
