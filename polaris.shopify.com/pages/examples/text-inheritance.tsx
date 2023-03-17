import {Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TextExample() {
  return (
    <Text as="p" variant="heading2xl" color="warning">
      <Text as="p">This is a 2xl heading</Text>
      <Text as="p">This is also a 2xl heading</Text>
    </Text>
  );
}

export default withPolarisExample(TextExample);
