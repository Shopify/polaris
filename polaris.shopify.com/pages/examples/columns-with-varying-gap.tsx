import React from 'react';
import {Columns} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ColumnsWithVaryingGapExample() {
  return (
    <SpacingBackground>
      <Columns gap="4" columns={3}>
        <Placeholder height="320px" />
        <Placeholder height="320px" />
        <Placeholder height="320px" />
      </Columns>
    </SpacingBackground>
  );
}

const SpacingBackground = ({children, width = '100%'}) => {
  return (
    <div
      style={{
        background: '#E0F8EE',
        width: width ?? undefined,
        height: 'auto',
      }}
    >
      {children}
    </div>
  );
};

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

export default withPolarisExample(ColumnsWithVaryingGapExample);
