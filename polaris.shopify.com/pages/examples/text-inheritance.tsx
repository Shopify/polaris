import {Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TextExample() {
  return (
    <Text as="p" variant="heading2xl" color="warning">
      <Text as="span">This is a 2xl heading</Text>
      <br />
      <Text as="span">This is also a 2xl heading</Text>
    </Text>
  );
}

export default withPolarisExample(TextExample);
