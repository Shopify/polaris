import React from 'react';
import {HorizontalGrid} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function HorizontalGridWithVaryingGapExample() {
  return (
    <SpacingBackground>
      <HorizontalGrid gap="4" columns={3}>
        <Placeholder height="320px" />
        <Placeholder height="320px" />
        <Placeholder height="320px" />
      </HorizontalGrid>
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

export default withPolarisExample(HorizontalGridWithVaryingGapExample);
