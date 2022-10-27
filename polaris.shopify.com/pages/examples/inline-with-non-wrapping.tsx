import React from 'react';
import {Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithNonWrappingExample() {
  return (
    <Inline>
      <Placeholder width="106px" height="36px" />
      <Placeholder width="106px" height="20px" />
      <Placeholder width="106px" height="20px" />
      <Placeholder width="106px" height="20px" />
      <Placeholder width="106px" height="20px" />
      <Placeholder width="106px" height="20px" />
    </Inline>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: '#7B47F1',
        height: height ?? undefined,
        width: width ?? undefined,
      }}
    />
  );
};

export default withPolarisExample(InlineWithNonWrappingExample);
