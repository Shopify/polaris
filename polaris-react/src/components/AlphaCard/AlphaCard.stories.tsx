import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {AlphaCard, AlphaStack, Bleed, Box, List, Text} from '@shopify/polaris';

export default {
  component: AlphaCard,
} as ComponentMeta<typeof AlphaCard>;

export function Default() {
  return (
    <AlphaCard>
      <AlphaStack gap="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <Text variant="bodyMd" as="p">
          View a summary of your online store’s performance.
        </Text>
      </AlphaStack>
    </AlphaCard>
  );
}

export function WithBackgroundSubdued() {
  return (
    <AlphaCard background="surface-subdued">
      <AlphaStack gap="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <Text variant="bodyMd" as="p">
          View a summary of your online store’s performance.
        </Text>
      </AlphaStack>
    </AlphaCard>
  );
}

export function WithBorderRadiusRoundedAbove() {
  return (
    <AlphaCard roundedAbove="sm">
      <AlphaStack gap="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <Text variant="bodyMd" as="p">
          View a summary of your online store’s performance.
        </Text>
      </AlphaStack>
    </AlphaCard>
  );
}

export function WithSubduedSection() {
  return (
    <AlphaCard roundedAbove="sm">
      <AlphaStack gap="5">
        <Text as="h3" variant="headingMd">
          Staff accounts
        </Text>
        <Box paddingBlockEnd="5">
          <List>
            <List.Item>Felix Crafford</List.Item>
            <List.Item>Ezequiel Manno</List.Item>
          </List>
        </Box>
      </AlphaStack>
      <Bleed marginBlockEnd="5">
        <Box
          background="surface-subdued"
          borderBlockStart="divider"
          borderRadiusEndStart="2"
          borderRadiusEndEnd="2"
          padding="5"
        >
          <AlphaStack gap="2">
            <Text variant="headingSm" as="h3">
              Deactivated staff accounts
            </Text>
            <List>
              <List.Item>Felix Crafford</List.Item>
              <List.Item>Ezequiel Manno</List.Item>
            </List>
          </AlphaStack>
        </Box>
      </Bleed>
    </AlphaCard>
  );
}
