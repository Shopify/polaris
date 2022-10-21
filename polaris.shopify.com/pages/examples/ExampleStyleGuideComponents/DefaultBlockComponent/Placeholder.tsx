import React from 'react';
import {Text, Inline} from '@shopify/polaris';

export interface PlaceholderProps {
  label?: string;
  height?: string;
  width?: string;
  childWidth?: string;
}

export const Placeholder = ({
  label,
  height,
  width,
  childWidth,
}: PlaceholderProps) => {
  return (
    <div
      style={{
        background: '#7B47F1',
        padding: '14px 8px 14px 8px',
        height: height ? `${height}px` : '',
        width: width ? `${width}px` : '',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          background: 'rgba(255, 255, 255, 0.3)',
          color: '#FFFFFF',
          width: childWidth ? `${childWidth}` : '',
        }}
      >
        <Text as="h2" variant="bodyMd" fontWeight="medium">
          {label}
        </Text>
      </div>
    </div>
  );
};
