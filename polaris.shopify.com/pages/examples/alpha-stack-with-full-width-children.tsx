import React from 'react';
import {AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithFullWidthChildrenExample() {
  return (
    <AlphaStack gap="025" fullWidth>
      <Placeholder height="48px" />
      <Placeholder height="48px" />
      <Placeholder height="48px" />
    </AlphaStack>
  );
}

const Placeholder = ({height = 'auto'}) => {
  return (
    <div
      style={{
        background: '#20828D',
        padding: '14px var(--p-space-2)',
        height: height,
      }}
    />
  );
};

export default withPolarisExample(AlphaStackWithFullWidthChildrenExample);
