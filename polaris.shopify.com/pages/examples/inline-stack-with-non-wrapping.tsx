import React from 'react';
import {InlineStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithNonWrappingExample() {
  return (
    <InlineStack wrap={false}>
      <Placeholder width="106px" height="36px" />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
      <Placeholder width="106px" height="20px" showBorder />
    </InlineStack>
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
          ? '1px dashed var(--p-color-bg-surface-success)'
          : 'none',
      }}
    />
  );
};

export default withPolarisExample(InlineWithNonWrappingExample);
