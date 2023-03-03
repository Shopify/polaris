import React from 'react';
import {Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithNonWrappingExample() {
  return (
    <Inline wrap={false}>
      <Placeholder width="106px" height="36px" />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
    </Inline>
  );
}

const Placeholder = ({height = 'auto', width = 'auto', showBorder = false}) => {
  return (
    <div
      style={{
        background: '#20828D',
        height: height,
        width: width,
        borderInlineStart: showBorder ? '1px dashed #EAFAF3' : 'none',
      }}
    />
  );
};

export default withPolarisExample(InlineWithNonWrappingExample);
