import React from 'react';
import {AlphaStack, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackExample() {
  return (
    <AlphaStack>
      <Placeholder width="320px" label="AlphaStack child" />
      <Placeholder width="320px" />
      <Placeholder width="320px" />
    </AlphaStack>
  );
}

const Placeholder = ({
  label = '',
  height = 'auto',
  width = 'auto',
  childWidth = 'auto',
}) => {
  return (
    <div
      style={{
        background: '#7B47F1',
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

export default withPolarisExample(AlphaStackExample);
