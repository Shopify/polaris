import {Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ButtonExample() {
  return <Button>Add product</Button>;
}

export default withPolarisExample(ButtonExample);
