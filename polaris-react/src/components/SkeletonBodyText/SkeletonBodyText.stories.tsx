import React from 'react';
import type {Meta} from '@storybook/react';
import {SkeletonBodyText} from '@shopify/polaris';

export default {
  component: SkeletonBodyText,
} as Meta<typeof SkeletonBodyText>;

export const Default = {
  render() {
    return <SkeletonBodyText />;
  },
};

export const SingleLineContent = {
  render() {
    return <SkeletonBodyText lines={1} />;
  },
};
