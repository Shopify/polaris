import {LegacyStack, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TextExample() {
  return (
    <Text as="p" variant="heading2xl" color="warning">
      <LegacyStack vertical>
        <Text as="span">This is a 2xl heading</Text>
        <Text as="span">This is also a 2xl heading</Text>
      </LegacyStack>
    </Text>
  );
}

export default withPolarisExample(TextExample);
