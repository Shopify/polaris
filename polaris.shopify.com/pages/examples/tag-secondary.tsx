import {Card, Tag, LegacyStack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TagExample() {
  return (
    <Card>
      <LegacyStack spacing="tight">
        <Tag secondary>Secondary</Tag>
      </LegacyStack>
    </Card>
  );
}

export default withPolarisExample(TagExample);
