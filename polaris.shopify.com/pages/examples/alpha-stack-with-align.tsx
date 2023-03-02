import React from 'react';
import {AlphaStack, Page, Inline, Text, Divider} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithAlignExample() {
  return (
    <Page>
      <AlphaStack gap="8" fullWidth>
        <AlphaStack align="start">
          <Placeholder height="48px" width="320px" label="Start" />
          <DashedDivider />
          <Placeholder height="48px" width="320px" />
          <DashedDivider />
          <Placeholder height="48px" width="320px" />
        </AlphaStack>
        <Divider />
        <AlphaStack align="center">
          <Placeholder height="48px" width="320px" label="Center" />
          <DashedDivider />
          <Placeholder height="48px" width="320px" />
          <DashedDivider />
          <Placeholder height="48px" width="320px" />
        </AlphaStack>
        <Divider />
        <AlphaStack align="end">
          <Placeholder height="48px" width="320px" label="End" />
          <DashedDivider />
          <Placeholder height="48px" width="320px" />
          <DashedDivider />
          <Placeholder height="48px" width="320px" />
        </AlphaStack>
      </AlphaStack>
    </Page>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: '#20828D',
        padding: '14px var(--p-space-2)',
        height: height,
        width: width,
      }}
    >
      <Inline align="center">
        <div
          style={{
            color: '#FFFFFF',
          }}
        >
          <Text as="h2" variant="bodyMd" fontWeight="regular">
            {label}
          </Text>
        </div>
      </Inline>
    </div>
  );
};

const DashedDivider = () => {
  return (
    <div style={{background: 'var(--p-color-text-info)', width: '320px'}}>
      <div style={{border: '1px dashed #EAFAF3'}} />
    </div>
  );
};

export default withPolarisExample(AlphaStackWithAlignExample);
