import React from 'react';
import {BlockStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BlockStackWithGapExample() {
  return (
    <SpacingBackground>
      <BlockStack gap="5">
        <Placeholder height="48px" />
        <Placeholder height="48px" />
        <Placeholder height="48px" />
      </BlockStack>
    </SpacingBackground>
  );
}

const SpacingBackground = ({children}: {children: React.ReactNode}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-bg-success-subdued)',
        height: 'auto',
      }}
    >
      {children}
    </div>
  );
};

const Placeholder = ({height = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding: '14px var(--p-space-2)',
        height: height,
      }}
    />
  );
};

export default withPolarisExample(BlockStackWithGapExample);
