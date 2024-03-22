import {BlockStack, FooterHelp, Link} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function FooterHelpAlignExample() {
  return (
    <BlockStack gap="1600">
      <FooterHelp align="start">
        Start{' '}
        <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
          fulfilling orders
        </Link>
      </FooterHelp>
      <FooterHelp align="center">
        Center{' '}
        <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
          fulfilling orders
        </Link>
      </FooterHelp>
      <FooterHelp align="end">
        End{' '}
        <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
          fulfilling orders
        </Link>
      </FooterHelp>
    </BlockStack>
  );
}

export default withPolarisExample(FooterHelpAlignExample);
