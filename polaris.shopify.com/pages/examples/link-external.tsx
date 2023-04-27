import {Link} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LinkExample() {
  return (
    <Link href="https://help.shopify.com/manual" target="_blank">
      Shopify Help Center
    </Link>
  );
}

export default withPolarisExample(LinkExample);
