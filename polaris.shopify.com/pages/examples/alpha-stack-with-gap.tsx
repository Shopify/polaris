import React from 'react';
import {AlphaStack, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithGapExample() {
  return (
    <SpacingBackground>
      <AlphaStack gap="5">
        <Placeholder height="48px" />
        <Placeholder height="48px" />
        <Placeholder height="48px" />
      </AlphaStack>
    </SpacingBackground>
  );
}

const SpacingBackground = ({children}) => {
  return (
    <div
      style={{
        background: '#E0F8EE',
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
        background: '#20828D',
        padding: '14px var(--p-space-2)',
        height: height,
      }}
    />
  );
};

export default withPolarisExample(AlphaStackWithGapExample);
