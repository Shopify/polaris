import React from 'react';
import {Columns, Text, Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ColumnsWithSetNumberExample() {
  return (
    <SpacingBackground>
      <Columns
        columns={{
          xs: '3fr 3fr',
          md: '4fr 2fr',
        }}
        gap={{
          xs: '4',
          md: '2',
        }}
      >
        <Placeholder height="320px" label="01" />
        <Placeholder height="320px" label="02" />
      </Columns>
    </SpacingBackground>
  );
}

const SpacingBackground = ({children, width = '100%'}) => {
  return (
    <div
      style={{
        background:
          'repeating-linear-gradient(-45deg, #7B47F1, #7B47F1 1px, #E8D1FA 1px, #E8D1FA 7px)',
        width: width ?? undefined,
        height: 'auto',
      }}
    >
      {children}
    </div>
  );
};

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
      <Inline align="center" blockAlign="center">
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

export default withPolarisExample(ColumnsWithSetNumberExample);
