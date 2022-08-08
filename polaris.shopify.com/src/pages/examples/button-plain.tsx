import {Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function ButtonExample() {
  return <Button plain>View shipping settings</Button>;
}

export default withPolarisExample(ButtonExample);
