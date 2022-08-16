import {TextStyle} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TextStyleExample() {
  return <TextStyle variation="positive">Orders increased</TextStyle>;
}

export default withPolarisExample(TextStyleExample);
