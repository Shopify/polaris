import {Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ButtonExample() {
  return <Button variant="tertiary">View shipping settings</Button>;
}

export default withPolarisExample(ButtonExample);
