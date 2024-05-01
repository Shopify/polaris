import React from 'react';
import type {Meta} from '@storybook/react';
import {BlockStack, LegacyCard, SkeletonTabs, Text} from '@shopify/polaris';

export default {
  component: SkeletonTabs,
} as Meta<typeof SkeletonTabs>;

export const All = {
  render() {
    return (
      /* eslint-disable react/jsx-pascal-case */
      <BlockStack gap="500">
        <Default.render />
        <WithACustomCount.render />
        <InsideOfACard.render />
        <InsideOfACardFitted.render />
      </BlockStack>
      /* eslint-enable react/jsx-pascal-case */
    );
  },
};

export const Default = {
  render() {
    return <SkeletonTabs />;
  },
};

export const WithACustomCount = {
  render() {
    return <SkeletonTabs count={4} />;
  },
};

export const InsideOfACard = {
  render() {
    return (
      <LegacyCard>
        <div>
          <SkeletonTabs count={6} />
          <LegacyCard.Section title="TabName">
            <Text as="p" variant="bodyMd">
              Tab X selected
            </Text>
          </LegacyCard.Section>
        </div>
      </LegacyCard>
    );
  },
};

export const InsideOfACardFitted = {
  render() {
    return (
      <LegacyCard>
        <div>
          <SkeletonTabs fitted />
          <LegacyCard.Section title="TabName">
            <Text as="p" variant="bodyMd">
              Tab X selected
            </Text>
          </LegacyCard.Section>
        </div>
      </LegacyCard>
    );
  },
};
