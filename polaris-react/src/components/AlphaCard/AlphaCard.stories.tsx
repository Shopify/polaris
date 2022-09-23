import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {AlphaCard, AlphaStack, Text} from '@shopify/polaris';

export default {
  component: AlphaCard,
} as ComponentMeta<typeof AlphaCard>;

export function Default() {
  return (
    <AlphaCard>
      <AlphaStack spacing="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </AlphaStack>
    </AlphaCard>
  );
}

export function BackgroundSubdued() {
  return (
    <AlphaCard backgroundColor="surface-subdued">
      <AlphaStack spacing="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </AlphaStack>
    </AlphaCard>
  );
}

export function BorderRadius() {
  return (
    <AlphaCard borderRadius="4">
      <AlphaStack spacing="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </AlphaStack>
    </AlphaCard>
  );
}

export function BorderRadiusRoundedAbove() {
  return (
    <AlphaCard roundedAbove="sm">
      <AlphaStack spacing="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </AlphaStack>
    </AlphaCard>
  );
}

export function Flat() {
  return (
    <AlphaCard elevation="transparent">
      <AlphaStack spacing="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </AlphaStack>
    </AlphaCard>
  );
}
