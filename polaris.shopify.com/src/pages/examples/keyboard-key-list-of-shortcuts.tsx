import {KeyboardKey} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function Example() {
  return <KeyboardKey>Ctrl</KeyboardKey>;
}

export default withPolarisExample(Example);
