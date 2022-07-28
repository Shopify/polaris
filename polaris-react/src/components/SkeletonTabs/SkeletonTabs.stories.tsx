import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Card, SkeletonTabs} from '@shopify/polaris';

export default {
  component: SkeletonTabs,
} as ComponentMeta<typeof SkeletonTabs>;

export function Default() {
  return (
    <Card>
      <SkeletonTabs />
    </Card>
  );
}

export function WithACustomCount() {
  return (
    <Card>
      <SkeletonTabs count={4} />
    </Card>
  );
}
