import React from 'react';
import {Columns} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ColumnsExample() {
  return (
    <div style={{width: '100%'}}>
      <Columns columns={{xs: 1, sm: 2, md: 3, lg: 6}} spacing={{xs: '2'}}>
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

export default withPolarisExample(ColumnsExample);
