import {Spinner} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function SpinnerExample() {
  return <Spinner accessibilityLabel="Small spinner example" size="small" />;
}

export default withPolarisExample(SpinnerExample);
