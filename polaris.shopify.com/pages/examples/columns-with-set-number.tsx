import React from 'react';
import {Columns} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ColumnsWithSetNumberExample() {
  return (
    <Columns columns={2} gap="025">
      <Placeholder height="320px" />
      <Placeholder height="320px" />
    </Columns>
  );
}

const Placeholder = ({height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        display: 'inherit',
        background: '#20828D',
        height: height ?? undefined,
        width: width ?? undefined,
      }}
    />
  );
};

export default withPolarisExample(ColumnsWithSetNumberExample);
