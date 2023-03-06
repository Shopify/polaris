import {Tag, LegacyStack, Icon} from '@shopify/polaris';
import {WandMinor} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TagExample() {
  return (
    <Tag url="#">
      <LegacyStack spacing="extraTight">
        <Icon source={WandMinor} />
        <span>Wholesale</span>
      </LegacyStack>
    </Tag>
  );
}

export default withPolarisExample(TagExample);
