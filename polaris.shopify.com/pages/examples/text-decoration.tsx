import {Text, LegacyStack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TextExample() {
  return (
    <LegacyStack vertical>
      <Text as="p" textDecorationLine="line-through">
        $100.00
      </Text>
    </LegacyStack>
  );
}

export default withPolarisExample(TextExample);
