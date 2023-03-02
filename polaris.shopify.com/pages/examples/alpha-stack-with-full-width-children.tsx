import React from 'react';
import {AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithFullWidthChildrenExample() {
  return (
    <AlphaStack fullWidth>
      <Placeholder height="48px" />
      <DashedDivider />
      <Placeholder height="48px" />
      <DashedDivider />
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

const DashedDivider = () => {
  return (
    <div style={{background: 'var(--p-color-text-info)'}}>
      <div
        style={{
          border: '1px dashed #EAFAF3',
        }}
      />
    </div>
  );
};

export default withPolarisExample(AlphaStackWithFullWidthChildrenExample);
