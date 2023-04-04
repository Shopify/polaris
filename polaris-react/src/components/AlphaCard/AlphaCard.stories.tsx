import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  AlphaCard,
  AlphaStack,
  Bleed,
  Box,
  Divider,
  List,
  Text,
} from '@shopify/polaris';

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
        <p>View a summary of your online store’s performance.</p>
      </AlphaStack>
    </AlphaCard>
  );
}

export function WithBackgroundSubdued() {
  return (
    <AlphaCard background="bg-subdued">
      <AlphaStack gap="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
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
        <p>View a summary of your online store’s performance.</p>
      </AlphaStack>
    </AlphaCard>
  );
}

export function WithResponsivePadding() {
  return (
    <AlphaCard padding={{xs: '5', sm: '6', md: '8'}} roundedAbove="sm">
      <AlphaStack gap={{xs: '4', sm: '5'}}>
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
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
      <Bleed
        marginBlockEnd={{xs: '4', sm: '5'}}
        marginInline={{xs: '4', sm: '5'}}
      >
        <Divider />
        <Box background="bg-subdued" padding={{xs: '4', sm: '5'}}>
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
