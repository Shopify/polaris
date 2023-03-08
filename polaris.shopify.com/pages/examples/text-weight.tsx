import {Text, LegacyStack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TextExample() {
  return (
    <LegacyStack vertical>
      <Text as="p" fontWeight="bold">
        Sales this year
      </Text>
      <Text as="p" fontWeight="semibold">
        Sales this year
      </Text>
      <Text as="p" fontWeight="medium">
        Sales this year
      </Text>
      <Text as="p" fontWeight="regular">
        Sales this year
      </Text>
    </LegacyStack>
  );
}

export default withPolarisExample(TextExample);
