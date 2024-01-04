import React from 'react';
import type {Meta} from '@storybook/react';
import {BlockStack, LegacyCard, SkeletonTabs} from '@shopify/polaris';

export default {
  component: SkeletonTabs,
} as Meta<typeof SkeletonTabs>;

export function All() {
  return (
    <BlockStack gap="500">
      <Default />
      <WithACustomCount />
      <InsideOfACard />
    </BlockStack>
  );
}

export function Default() {
  return <SkeletonTabs />;
}

export function WithACustomCount() {
  return <SkeletonTabs count={4} />;
}

export function InsideOfACard() {
  return (
    <LegacyCard>
      <SkeletonTabs count={6} />
      <LegacyCard.Section title="Something">
        <p>Tab X selected</p>
      </LegacyCard.Section>
    </LegacyCard>
  );
}
