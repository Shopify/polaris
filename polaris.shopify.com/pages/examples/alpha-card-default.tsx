import {AlphaCard, Text, AlphaStack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardExample() {
  return (
    <AlphaCard>
      <AlphaStack spacing="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </AlphaStack>
    </AlphaCard>
  );
}

export default withPolarisExample(AlphaCardExample);
