import {ButtonGroup, Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ButtonGroupOutlineWithSegmentedButtonsExample() {
  return (
    <ButtonGroup segmented>
      <Button outline>Bold</Button>
      <Button outline>Italic</Button>
      <Button outline>Underline</Button>
    </ButtonGroup>
  );
}

export default withPolarisExample(
  ButtonGroupOutlineWithSegmentedButtonsExample,
);
