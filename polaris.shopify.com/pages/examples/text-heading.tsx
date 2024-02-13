import {Text, LegacyStack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TextExample() {
  return (
    <LegacyStack vertical>
      <Text variant="headingXl" as="h4">
        Online store dashboard
      </Text>
      <Text variant="headingLg" as="h5">
        Online store dashboard
      </Text>
      <Text variant="headingMd" as="h6">
        Online store dashboard
      </Text>
      <Text variant="headingSm" as="h6">
        Online store dashboard
      </Text>
    </LegacyStack>
  );
}

export default withPolarisExample(TextExample);
