import {Card, KeyboardKey} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function Example() {
  return (
    <Card>
      <KeyboardKey>Ctrl</KeyboardKey>
    </Card>
  );
}

export default withPolarisExample(Example);
