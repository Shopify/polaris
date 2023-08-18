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

import {useFeatures} from '../../utilities/features';

export default {
  component: Card,
} as ComponentMeta<typeof Card>;

export function Default() {
  return (
    <Card>
      <BlockStack gap="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </BlockStack>
    </Card>
  );
}

export function WithBackgroundSubdued() {
  const {polarisSummerEditions2023} = useFeatures();

  return (
    <Card
      background={
        polarisSummerEditions2023 ? 'bg-secondary-experimental' : 'bg-subdued'
      }
    >
      <BlockStack gap="5">
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
      <BlockStack gap="5">
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
    <Card padding={{xs: '5', sm: '6', md: '8'}} roundedAbove="sm">
      <BlockStack gap={{xs: '4', sm: '5'}}>
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </BlockStack>
    </Card>
  );
}

export function WithSubduedSection() {
  const {polarisSummerEditions2023} = useFeatures();

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="5">
        <Text as="h3" variant="headingMd">
          Staff accounts
        </Text>
        <Box paddingBlockEnd="5">
          <List>
            <List.Item>Felix Crafford</List.Item>
            <List.Item>Ezequiel Manno</List.Item>
          </List>
        </Box>
      </BlockStack>
      <Bleed
        marginBlockEnd={{xs: '4', sm: '5'}}
        marginInline={{xs: '4', sm: '5'}}
      >
        <Divider />
        <Box
          background={
            polarisSummerEditions2023
              ? 'bg-secondary-experimental'
              : 'bg-subdued'
          }
          padding={{xs: '4', sm: '5'}}
        >
          <BlockStack gap="2">
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
