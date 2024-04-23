import React from 'react';
import type {Meta} from '@storybook/react';
import {SkeletonDisplayText} from '@shopify/polaris';

export default {
  component: SkeletonDisplayText,
} as Meta<typeof SkeletonDisplayText>;

export const MediumAndLarge = {
  render() {
    return <SkeletonDisplayText size="medium" />;
  },
};

export const ExtraLarge = {
  render() {
    return <SkeletonDisplayText size="extraLarge" />;
  },
};

export const Small = {
  render() {
    return <SkeletonDisplayText size="small" />;
  },
};

export const MaxWidth = {
  render() {
    return <SkeletonDisplayText maxWidth="80%" />;
  },
};
