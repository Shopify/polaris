import React from 'react';
import {AlphaStack, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithGapExample() {
  return (
    <SpacingBackground width="320px">
      <AlphaStack gap="5">
        <Placeholder height="48px" width="320px" />
        <Placeholder height="48px" width="320px" />
        <Placeholder height="48px" width="320px" />
      </AlphaStack>
    </SpacingBackground>
  );
}

const SpacingBackground = ({children, width}) => {
  return (
    <div
      style={{
        background: '#E0F8EE',
        width: width ?? '100%',
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
        background: '#20828D',
        padding: '14px var(--p-space-2)',
        height: height,
        width: width,
      }}
    />
  );
};

export default withPolarisExample(AlphaStackWithGapExample);
