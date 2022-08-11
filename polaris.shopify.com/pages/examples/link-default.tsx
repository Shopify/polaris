import {Link} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LinkExample() {
  return <Link url="https://help.shopify.com/manual">fulfilling orders</Link>;
}

export default withPolarisExample(LinkExample);
