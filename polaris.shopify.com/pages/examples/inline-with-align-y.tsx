import React from 'react';
import {AlphaStack, Inline, Text, Page} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithVerticalAlignmentExample() {
  return (
    <Page narrowWidth>
      <AlphaStack spacing="16">
        <Inline wrap align="start">
          <Placeholder width="106px" label="Start" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </Inline>
        <Inline wrap align="center">
          <Placeholder width="106px" label="Center" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </Inline>
        <Inline wrap align="end">
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
        height: height ?? undefined,
        width: width ?? undefined,
      }}
    >
      <Inline align="center" alignY="center">
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

export default withPolarisExample(InlineWithVerticalAlignmentExample);
