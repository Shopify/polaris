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

import {useFeatures} from '../../utilities/features';

export default {
  component: Card,
} as ComponentMeta<typeof Card>;

export function Default() {
  return (
    <Card>
      <VerticalStack gap="500">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </VerticalStack>
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
      <VerticalStack gap="500">
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
      <VerticalStack gap="500">
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
    <Card padding={{xs: '500', sm: '600', md: '800'}} roundedAbove="sm">
      <VerticalStack gap={{xs: '400', sm: '500'}}>
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </VerticalStack>
    </Card>
  );
}

export function WithSubduedSection() {
  const {polarisSummerEditions2023} = useFeatures();

  return (
    <Card roundedAbove="sm">
      <VerticalStack gap="500">
        <Text as="h3" variant="headingMd">
          Staff accounts
        </Text>
        <Box paddingBlockEnd="500">
          <List>
            <List.Item>Felix Crafford</List.Item>
            <List.Item>Ezequiel Manno</List.Item>
          </List>
        </Box>
      </VerticalStack>
      <Bleed
        marginBlockEnd={{xs: '400', sm: '500'}}
        marginInline={{xs: '400', sm: '500'}}
      >
        <Divider />
        <Box
          background={
            polarisSummerEditions2023
              ? 'bg-secondary-experimental'
              : 'bg-subdued'
          }
          padding={{xs: '400', sm: '500'}}
        >
          <VerticalStack gap="200">
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
