import {Tag, LegacyStack, Icon, Card} from '@shopify/polaris';
import {WandIcon} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TagExample() {
  return (
    <Card>
      <Tag url="#">
        <LegacyStack spacing="extraTight">
          <Icon source={WandIcon} />
          <span>Wholesale</span>
        </LegacyStack>
      </Tag>
    </Card>
  );
}

export default withPolarisExample(TagExample);
