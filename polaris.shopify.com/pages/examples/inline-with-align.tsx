import React from 'react';
import {Inline, Text, AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithAlignExample() {
  return (
    <AlphaStack spacing="16">
      <Inline wrap alignY="top">
        <Placeholder width="106px" label="Top" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
      </Inline>
      <Inline wrap alignY="center">
        <Placeholder width="106px" label="Center" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
      </Inline>
      <Inline wrap alignY="bottom">
        <Placeholder width="106px" label="End" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
      </Inline>
      <Inline wrap alignY="baseline">
        <Placeholder width="106px" header={true} label="Baseline" />
        <Placeholder width="106px" padding="0" label="text" />
        <Placeholder width="106px" padding="0" label="text" />
        <Placeholder width="106px" padding="0" label="text" />
        <Placeholder width="106px" padding="0" label="text" />
        <Placeholder width="106px" padding="0" label="text" />
      </Inline>
    </AlphaStack>
  );
}

const Placeholder = ({
  label = '',
  height = 'auto',
  width = 'auto',
  padding = '6px 0px',
  header = false,
}) => {
  return (
    <div
      style={{
        padding: padding ?? undefined,
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
          {header ? (
            <Text as="h2" variant="headingLg" fontWeight="medium">
              {label}
            </Text>
          ) : (
            <Text as="h2" variant="bodyMd" fontWeight="medium">
              {label}
            </Text>
          )}
        </div>
      </Inline>
    </div>
  );
};

export default withPolarisExample(InlineWithAlignExample);
