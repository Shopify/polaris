import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {SkeletonDisplayText} from '@shopify/polaris';

export default {
  component: SkeletonDisplayText,
} as ComponentMeta<typeof SkeletonDisplayText>;

export function MediumAndLarge() {
  return <SkeletonDisplayText size="medium" />;
}

export function ExtraLarge() {
  return <SkeletonDisplayText size="extraLarge" />;
}

export function Small() {
  return <SkeletonDisplayText size="small" />;
}
