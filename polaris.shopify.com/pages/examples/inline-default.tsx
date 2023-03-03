import React from 'react';
import {Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineExample() {
  return (
    <Inline>
      <Placeholder width="106px" height="42px" margin="6px" />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
    </Inline>
  );
}

const Placeholder = ({
  height = 'auto',
  width = 'auto',
  margin = '0',
  showBorder = false,
}) => {
  return (
    <div
      style={{
        background: '#20828D',
        height: height,
        width: width,
        margin: `${margin} 0px ${margin}`,
        borderInlineStart: showBorder ? '1px dashed #EAFAF3' : 'none',
      }}
    />
  );
};

export default withPolarisExample(InlineExample);
