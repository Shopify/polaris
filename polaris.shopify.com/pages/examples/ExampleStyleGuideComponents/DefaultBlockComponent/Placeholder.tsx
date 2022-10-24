import React from 'react';
import {Text} from '@shopify/polaris';

export interface PlaceholderProps {
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

export default Placeholder;
