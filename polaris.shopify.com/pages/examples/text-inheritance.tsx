import {Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TextExample() {
  return (
    <Text as="p" variant="headingXl" tone="caution">
      <Text as="span">This is a Xl heading</Text>
      <br />
      <Text as="span">This is also a Xl heading</Text>
    </Text>
  );
}

export default withPolarisExample(TextExample);
