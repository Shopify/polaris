import {Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ButtonExample() {
  return (
    <div>
      Could not retrieve data.{' '}
      <Button plain monochrome>
        Try again
      </Button>
    </div>
  );
}

export default withPolarisExample(ButtonExample);
