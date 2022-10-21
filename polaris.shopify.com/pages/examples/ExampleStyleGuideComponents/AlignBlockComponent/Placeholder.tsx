import React from 'react';
import {Text, Inline} from '@shopify/polaris';

type Align = 'start' | 'end' | 'center';

export interface PlaceholderProps {
  label?: string;
  height?: string;
  width?: string;
  childAlign?: Align;
}

export const Placeholder = ({
  label,
  height,
  width,
  childAlign = 'start',
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
      <Inline align={childAlign}>
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.3)',
            color: '#FFFFFF',
          }}
        >
          <Text as="h2" variant="bodyMd" fontWeight="medium">
            {label}
          </Text>
        </div>
      </Inline>
    </div>
  );
};
