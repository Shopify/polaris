'use client';

import React from 'react';
import {Inline, Text, AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function InlineWithVerticalAlignmentExample() {
  return (
    <AlphaStack gap="16">
      <Inline blockAlign="start">
        <Placeholder width="106px" label="Start" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
      </Inline>
      <Inline blockAlign="center">
        <Placeholder width="106px" label="Center" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
      </Inline>
      <Inline blockAlign="end">
        <Placeholder width="106px" label="End" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
      </Inline>
      <Inline blockAlign="baseline">
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
        padding: padding,
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

export default withPolarisExample(InlineWithVerticalAlignmentExample);
