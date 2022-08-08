import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Banner, Link} from '@shopify/polaris';

export default {
  component: Link,
} as ComponentMeta<typeof Link>;

export function Default() {
  return <Link url="https://help.shopify.com/manual">fulfilling orders</Link>;
}

export function Monochrome() {
  return (
    <Link monochrome url="https://help.shopify.com/manual">
      fulfilling orders
    </Link>
  );
}

export function MonochromeInABanner() {
  return (
    <Banner>
      Learn more about{' '}
      <Link url="https://help.shopify.com/manual">fulfilling orders</Link>
    </Banner>
  );
}

export function External() {
  return (
    <Link url="https://help.shopify.com/manual" external>
      Shopify Help Center
    </Link>
  );
}
