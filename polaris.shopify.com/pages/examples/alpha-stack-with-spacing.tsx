import React from 'react';
import {AlphaStack, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

interface SpacingBackgroundProps {
  children: React.ReactNode;
  width?: string;
}

const SpacingBackground = ({children, width}: SpacingBackgroundProps) => {
  return (
    <div
      style={{
        background:
          'repeating-linear-gradient(-45deg, #7B47F1, #7B47F1 1px, #E8D1FA 1px, #E8D1FA 7px)',
        width: width ?? '100%',
        height: 'auto',
      }}
    >
      {children}
    </div>
  );
};

interface PlaceholderProps {
  label?: string;
  height?: string;
  width?: string;
  childWidth?: string;
}

const Placeholder = ({label, height, width, childWidth}: PlaceholderProps) => {
  return (
    <div
      style={{
        background: 'var(--surface-example-block)',
        padding: '14px var(--p-space-2)',
        height: height ?? undefined,
        width: width ?? undefined,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          background: 'rgba(255, 255, 255, 0.3)',
          color: '#FFFFFF',
          width: childWidth ?? undefined,
        }}
      >
        <Text as="h2" variant="bodyMd" fontWeight="medium">
          {label}
        </Text>
      </div>
    </div>
  );
};

function AlphaStackWithSpacingExample() {
  return (
    <SpacingBackground width="320px">
      <AlphaStack spacing="5">
        <Placeholder width="320px" label="Stack child" />
        <Placeholder width="320px" />
        <Placeholder width="320px" />
      </AlphaStack>
    </SpacingBackground>
  );
}

export default withPolarisExample(AlphaStackWithSpacingExample);
