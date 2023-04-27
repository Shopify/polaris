import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Banner, Link} from '@shopify/polaris';

export default {
  component: Link,
} as ComponentMeta<typeof Link>;

export function Default() {
  return <Link href="https://help.shopify.com/manual">fulfilling orders</Link>;
}

export function Underlined() {
  return (
    <Link underline="always" href="https://help.shopify.com/manual">
      fulfilling orders
    </Link>
  );
}

export function MonochromeAndUnderlinedInABanner() {
  return (
    <Banner>
      Learn more about{' '}
      <Link
        tone="inherit"
        underline="always"
        href="https://help.shopify.com/manual"
      >
        fulfilling orders
      </Link>
    </Banner>
  );
}
