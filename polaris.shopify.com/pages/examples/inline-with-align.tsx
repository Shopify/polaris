import React from 'react';
import {Stack, Inline, Text, Page, Divider} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithAlignExample() {
  return (
    <Page narrowWidth>
      <Stack gap="16">
        <Inline gap="025" align="start">
          <Placeholder width="106px" label="Start" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </Inline>
        <Divider />
        <Inline gap="025" align="center">
          <Placeholder width="106px" label="Center" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </Inline>
        <Divider />
        <Inline gap="025" align="end">
          <Placeholder width="106px" label="End" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </Inline>
      </Stack>
    </Page>
  );
}

const Placeholder = ({
  label = '',
  height = 'auto',
  width = 'auto',
  showBorder = false,
}) => {
  return (
    <div
      style={{
        padding: '6px 0',
        background: '#20828D',
        height: height,
        width: width,
        borderInlineStart: showBorder ? '1px dashed #EAFAF3' : 'none',
      }}
    >
      <Inline align="center">
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

export default withPolarisExample(InlineWithAlignExample);
