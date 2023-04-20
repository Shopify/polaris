import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Card,
  VerticalStack,
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
      <VerticalStack gap="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </VerticalStack>
    </Card>
  );
}

export function WithBackgroundSubdued() {
  return (
    <Card background="bg-subdued">
      <VerticalStack gap="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </VerticalStack>
    </Card>
  );
}

export function WithBorderRadiusRoundedAbove() {
  return (
    <Card roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </VerticalStack>
    </Card>
  );
}

export function WithResponsivePadding() {
  return (
    <Card padding={{xs: '5', sm: '6', md: '8'}} roundedAbove="sm">
      <VerticalStack gap={{xs: '4', sm: '5'}}>
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </VerticalStack>
    </Card>
  );
}

export function WithSubduedSection() {
  return (
    <Card roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h3" variant="headingMd">
          Staff accounts
        </Text>
        <Box paddingBlockEnd="5">
          <List>
            <List.Item>Felix Crafford</List.Item>
            <List.Item>Ezequiel Manno</List.Item>
          </List>
        </Box>
      </VerticalStack>
      <Bleed marginBlockEnd="5" marginInline="5">
        <Divider />
        <Box
          background="bg-subdued"
          borderRadiusEndStart="2"
          borderRadiusEndEnd="2"
          padding="5"
        >
          <VerticalStack gap="2">
            <Text variant="headingSm" as="h3">
              Deactivated staff accounts
            </Text>
            <List>
              <List.Item>Felix Crafford</List.Item>
              <List.Item>Ezequiel Manno</List.Item>
            </List>
          </VerticalStack>
        </Box>
      </Bleed>
    </Card>
  );
}
