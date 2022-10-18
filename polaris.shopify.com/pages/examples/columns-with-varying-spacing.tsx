import React from 'react';
import {Columns} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ColumnsWithVaryingGapExample() {
  return (
    <div style={{width: '100%'}}>
      <Columns
        columns={{xs: 3}}
        spacing={{xs: '025', sm: '05', md: '1', lg: '2', xl: '4'}}
      >
        <div style={{background: 'var(--p-surface-success)'}}>Column one</div>
        <div style={{background: 'var(--p-surface-success)'}}>Column two</div>
        <div style={{background: 'var(--p-surface-success)'}}>Column three</div>
      </Columns>
    </div>
  );
}

export default withPolarisExample(ColumnsWithVaryingGapExample);
