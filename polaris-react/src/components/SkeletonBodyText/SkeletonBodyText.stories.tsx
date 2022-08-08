import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {SkeletonBodyText} from '@shopify/polaris';

export default {
  component: SkeletonBodyText,
} as ComponentMeta<typeof SkeletonBodyText>;

export function Default() {
  return <SkeletonBodyText />;
}

export function SingleLineContent() {
  return <SkeletonBodyText lines={1} />;
}
