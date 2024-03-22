import React from 'react';
import type {Meta} from '@storybook/react';
import {FooterHelp, Link} from '@shopify/polaris';

export default {
  component: FooterHelp,
} as Meta<typeof FooterHelp>;

export function Default() {
  return (
    <FooterHelp>
      Learn more about{' '}
      <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
        fulfilling orders
      </Link>
    </FooterHelp>
  );
}

export function LeftAligned() {
  return (
    <FooterHelp align="start">
      Learn more about{' '}
      <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
        fulfilling orders
      </Link>
    </FooterHelp>
  );
}

export function RightAligned() {
  return (
    <FooterHelp align="end">
      Learn more about{' '}
      <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
        fulfilling orders
      </Link>
    </FooterHelp>
  );
}
