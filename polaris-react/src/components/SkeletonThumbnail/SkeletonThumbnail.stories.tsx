import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {SkeletonThumbnail, VerticalStack} from '@shopify/polaris';

export function All() {
  return (
    <VerticalStack gap="4">
      <ExtraSmall />
      <Small />
      <Medium />
      <Large />
    </VerticalStack>
  );
}

export default {
  component: SkeletonThumbnail,
} as ComponentMeta<typeof SkeletonThumbnail>;

export function Medium() {
  return <SkeletonThumbnail size="medium" />;
}

export function Large() {
  return <SkeletonThumbnail size="large" />;
}

export function Small() {
  return <SkeletonThumbnail size="small" />;
}

export function ExtraSmall() {
  return <SkeletonThumbnail size="extraSmall" />;
}
