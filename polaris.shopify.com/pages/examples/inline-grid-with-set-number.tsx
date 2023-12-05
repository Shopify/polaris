import React from 'react';
import {InlineGrid} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineGridWithSetNumberExample() {
  return (
    <InlineGrid columns={2}>
      <Placeholder height="320px" />
      <Placeholder height="320px" showBorder />
    </InlineGrid>
  );
}

const Placeholder = ({height = 'auto', width = 'auto', showBorder = false}) => {
  return (
    <div
      style={{
        display: 'inherit',
        background: 'var(--p-color-text-info)',
        height: height ?? undefined,
        width: width ?? undefined,
        borderInlineStart: showBorder
          ? '1px dashed var(--p-color-bg-surface-success)'
          : 'none',
      }}
    />
  );
};

export default withPolarisExample(InlineGridWithSetNumberExample);
