import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {FooterHelp, Link} from '@shopify/polaris';

export default {
  component: FooterHelp,
} as ComponentMeta<typeof FooterHelp>;

export function Default() {
  return (
    <FooterHelp>
      Learn more about{' '}
      <Link
        url="https://help.shopify.com/manual/orders/fulfill-orders"
        underline
      >
        fulfilling orders
      </Link>
    </FooterHelp>
  );
}
