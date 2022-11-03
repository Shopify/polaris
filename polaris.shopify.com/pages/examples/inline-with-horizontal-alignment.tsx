import React from 'react';
import {AlphaStack, Inline, Text, Page} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithHorizontalAlignmentExample() {
  return (
    <Page narrowWidth>
      <AlphaStack spacing="16">
        <Inline align="start">
          <Placeholder width="106px" label="Start" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </Inline>
        <Inline align="center">
          <Placeholder width="106px" label="Center" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </Inline>
        <Inline align="end">
          <Placeholder width="106px" label="End" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </Inline>
      </AlphaStack>
    </Page>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        padding: '6px 0',
        background: '#7B47F1',
        height: height,
        width: width,
      }}
    >
      <Inline align="center" blockAlign="center">
        <div
          style={{
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

export default withPolarisExample(InlineWithHorizontalAlignmentExample);
