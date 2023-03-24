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

const SpacingBackground = ({
  children,
  width = '100%',
}: {
  children: React.ReactNode;
  width?: string;
}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-bg-success-subdued)',
        width,
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
        background: 'var(--p-color-text-info)',
        height: height ?? undefined,
        width: width ?? undefined,
      }}
    />
  );
};

export default withPolarisExample(ColumnsWithVaryingGapExample);
