import React from 'react';
import {Columns} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ColumnsWithFreeAndFixedWidthsExample() {
  return (
    <div style={{width: '90vw'}}>
      <Columns
        columns={{xs: 2, sm: '2fr 1fr', md: '2fr 1fr 1fr', lg: 6}}
        gap={{xs: '2'}}
      >
        <div style={{background: 'var(--p-surface-success)'}}>Column one</div>
        <div style={{background: 'var(--p-surface-success)'}}>Column two</div>
        <div style={{background: 'var(--p-surface-success)'}}>Column three</div>
        <div style={{background: 'var(--p-surface-success)'}}>Column four</div>
        <div style={{background: 'var(--p-surface-success)'}}>Column five</div>
        <div style={{background: 'var(--p-surface-success)'}}>Column six</div>
      </Columns>
    </div>
  );
}

export default withPolarisExample(ColumnsWithFreeAndFixedWidthsExample);
