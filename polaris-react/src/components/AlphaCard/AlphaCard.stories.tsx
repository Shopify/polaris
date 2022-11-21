import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {AlphaCard, AlphaStack, Text} from '@shopify/polaris';

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
    <AlphaCard background="surface-subdued">
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
