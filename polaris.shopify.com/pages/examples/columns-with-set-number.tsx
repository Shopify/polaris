import React from 'react';
import {Columns} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ColumnsWithSetNumberExample() {
  return (
    <Columns columns={2}>
      <Placeholder height="320px" />
      <Placeholder height="320px" showBorder />
    </Columns>
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
          ? '1px dashed var(--p-color-bg-success-subdued)'
          : 'none',
      }}
    />
  );
};

export default withPolarisExample(ColumnsWithSetNumberExample);
