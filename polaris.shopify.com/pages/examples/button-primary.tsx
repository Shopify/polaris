import {Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ButtonExample() {
  return <Button variant="primary">Save theme</Button>;
}

export default withPolarisExample(ButtonExample);
