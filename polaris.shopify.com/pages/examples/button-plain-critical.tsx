import {Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ButtonExample() {
  return (
    <Button variant="plain" tone="critical">
      Remove
    </Button>
  );
}

export default withPolarisExample(ButtonExample);
