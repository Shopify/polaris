import React from 'react';

import {Card, Divider, Text, BlockStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function DividerWithBorderColorExample() {
  return (
    <Card>
      <BlockStack gap="500">
        <Text as="h1" variant="headingXs">
          Default
        </Text>
        <Divider />
        <Text as="h1" variant="headingXs">
          Border
        </Text>
        <Divider borderColor="border" />
        <Text as="h1" variant="headingXs">
          Border inverse
        </Text>
        <Divider borderColor="border-inverse" />
        <Text as="h1" variant="headingXs">
          Transparent
        </Text>
        <Divider borderColor="transparent" />
      </BlockStack>
    </Card>
  );
}

export default withPolarisExample(DividerWithBorderColorExample);
