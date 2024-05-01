import React from 'react';
import type {Meta} from '@storybook/react';
import {FooterHelp, Link} from '@shopify/polaris';

export default {
  component: FooterHelp,
} as Meta<typeof FooterHelp>;

export const Default = {
  render() {
    return (
      <FooterHelp>
        Learn more about{' '}
        <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
          fulfilling orders
        </Link>
      </FooterHelp>
    );
  },
};

export const LeftAligned = {
  render() {
    return (
      <FooterHelp align="start">
        Learn more about{' '}
        <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
          fulfilling orders
        </Link>
      </FooterHelp>
    );
  },
};

export const RightAligned = {
  render() {
    return (
      <FooterHelp align="end">
        Learn more about{' '}
        <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
          fulfilling orders
        </Link>
      </FooterHelp>
    );
  },
};
