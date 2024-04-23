import React from 'react';
import type {Meta} from '@storybook/react';
import {SkeletonThumbnail, BlockStack} from '@shopify/polaris';

export const All = {
  render() {
    return (
      /* eslint-disable react/jsx-pascal-case */
      <BlockStack gap="400">
        <ExtraSmall.render />
        <Small.render />
        <Medium.render />
        <Large.render />
      </BlockStack>
      /* eslint-enable react/jsx-pascal-case */
    );
  },
};

export default {
  component: SkeletonThumbnail,
} as Meta<typeof SkeletonThumbnail>;

export const Medium = {
  render() {
    return <SkeletonThumbnail size="medium" />;
  },
};

export const Large = {
  render() {
    return <SkeletonThumbnail size="large" />;
  },
};

export const Small = {
  render() {
    return <SkeletonThumbnail size="small" />;
  },
};

export const ExtraSmall = {
  render() {
    return <SkeletonThumbnail size="extraSmall" />;
  },
};
