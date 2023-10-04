import React from 'react';
import {InlineGrid} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineGridWithVaryingGapExample() {
  return (
    <SpacingBackground>
      <InlineGrid gap="400" columns={3}>
        <Placeholder height="320px" />
        <Placeholder height="320px" />
        <Placeholder height="320px" />
      </InlineGrid>
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
        background: 'var(--p-color-bg-surface-success)',
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

export default withPolarisExample(InlineGridWithVaryingGapExample);
