'use client';

import React from 'react';
import {Columns, Text, Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function ColumnsWithFreeAndFixedWidthsExample() {
  return (
    <Columns columns={{xs: '2.5fr 1fr 1fr 1fr 1fr 1fr'}}>
      <Placeholder height="320px" label="01" />
      <Placeholder height="320px" label="02" />
      <Placeholder height="320px" label="03" />
      <Placeholder height="320px" label="04" />
      <Placeholder height="320px" label="05" />
      <Placeholder height="320px" label="06" />
    </Columns>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        display: 'inherit',
        background: '#7B47F1',
        height: height ?? undefined,
        width: width ?? undefined,
      }}
    >
      <Inline gap="4" align="center" blockAlign="center">
        <div
          style={{
            color: '#FFFFFF',
            width: width ?? undefined,
          }}
        >
          <Text as="h2" variant="bodyMd" fontWeight="medium" alignment="center">
            {label}
          </Text>
        </div>
      </Inline>
    </div>
  );
};

export default withPolarisExample(ColumnsWithFreeAndFixedWidthsExample);
