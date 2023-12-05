import {LegacyCard} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LegacyCardExample() {
  return (
    <LegacyCard sectioned title="Variants" actions={[{content: 'Add variant'}]}>
      <p>
        Add variants if this product comes in multiple versions, like different
        sizes or colors.
      </p>
    </LegacyCard>
  );
}

export default withPolarisExample(LegacyCardExample);
