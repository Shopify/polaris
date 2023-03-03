import React from 'react';
import {AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithFullWidthChildrenExample() {
  return (
    <AlphaStack fullWidth>
      <Placeholder height="48px" />
      <Placeholder height="48px" showBorder />
      <Placeholder height="48px" showBorder />
    </AlphaStack>
  );
}

const Placeholder = ({height = 'auto', showBorder = false}) => {
  return (
    <div
      style={{
        background: '#20828D',
        padding: '14px var(--p-space-2)',
        height: height,
        borderBlockStart: showBorder ? '1px dashed #EAFAF3' : 'none',
      }}
    />
  );
};

export default withPolarisExample(AlphaStackWithFullWidthChildrenExample);
