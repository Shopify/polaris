import React from 'react';
import type {Meta} from '@storybook/react';
import {Banner, Link} from '@shopify/polaris';

export default {
  component: Link,
  parameters: {
    disableAnchorTargetOverride: true,
  },
} as Meta<typeof Link>;

export const Default = {
  render() {
    return <Link url="https://help.shopify.com/manual">fulfilling orders</Link>;
  },
};

export const Monochrome = {
  render() {
    return (
      <Link monochrome url="https://help.shopify.com/manual">
        fulfilling orders
      </Link>
    );
  },
};

export const MonochromeInABanner = {
  render() {
    return (
      <Banner>
        Learn more about{' '}
        <Link url="https://help.shopify.com/manual">fulfilling orders</Link>
      </Banner>
    );
  },
};

export const External = {
  render() {
    return (
      <Link url="https://help.shopify.com/manual" external>
        Shopify Help Center
      </Link>
    );
  },
};
