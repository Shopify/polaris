import React from 'react';
import {Text, Inline} from '@shopify/polaris';

type Align = 'start' | 'end' | 'center';

export interface PlaceholderProps {
  label?: string;
  height?: string;
  width?: string;
  childAlign?: Align;
}

const Placeholder = ({
  label,
  height,
  width,
  childAlign = 'start',
}: PlaceholderProps) => {
  return (
    <div
      style={{
        background: 'var(--surface-example-block)',
        padding: '14px var(--p-space-2)',
        height: height ?? undefined,
        width: width ?? undefined,
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

export default Placeholder;
