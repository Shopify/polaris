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
        background: 'var(--p-color-text-info)',
        height: height,
        width: width,
        borderInlineStart: showBorder
          ? '1px dashed var(--p-color-bg-success-subdued)'
          : 'none',
      }}
    />
  );
};

export default withPolarisExample(InlineWithNonWrappingExample);
