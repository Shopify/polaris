import {ButtonGroup, Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ButtonGroupDefaultExample() {
  return (
    <ButtonGroup>
      <Button>Cancel</Button>
      <Button variant="primary">Save</Button>
    </ButtonGroup>
  );
}

export default withPolarisExample(ButtonGroupDefaultExample);
