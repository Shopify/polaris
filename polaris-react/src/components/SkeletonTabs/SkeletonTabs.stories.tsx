import type {ComponentMeta} from '@storybook/react';
import {LegacyCard, SkeletonTabs} from '@shopify/polaris';

export default {
  component: SkeletonTabs,
} as ComponentMeta<typeof SkeletonTabs>;

export function Default() {
  return (
    <LegacyCard>
      <SkeletonTabs />
    </LegacyCard>
  );
}

export function WithACustomCount() {
  return (
    <LegacyCard>
      <SkeletonTabs count={4} />
    </LegacyCard>
  );
}
