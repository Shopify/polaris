import React from 'react';
import {AlphaStack, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

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

function AlphaStackExample() {
  return (
    <AlphaStack>
      <Placeholder width="320px" label="Stack child" />
      <Placeholder width="320px" />
      <Placeholder width="320px" />
    </AlphaStack>
  );
}

export default withPolarisExample(AlphaStackExample);
