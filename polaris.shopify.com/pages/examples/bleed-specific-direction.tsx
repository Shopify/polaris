import React from 'react';

import {BlockStack, Bleed, Card, Text, InlineStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BleedSpecificDirectionExample() {
  return (
    <BlockStack gap="6">
      <Card>
        <Bleed marginInlineStart="8">
          <Placeholder label="marginInlineStart" />
        </Bleed>
      </Card>
      <Card>
        <Bleed marginInlineEnd="8">
          <Placeholder label="marginInlineEnd" />
        </Bleed>
      </Card>
      <Card>
        <Bleed marginBlockStart="8">
          <Placeholder label="marginBlockStart" />
        </Bleed>
      </Card>
      <Card>
        <Bleed marginBlockEnd="8">
          <Placeholder label="marginBlockEnd" />
        </Bleed>
      </Card>
    </BlockStack>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding: '14px var(--p-space-2)',
        height: height,
        width: width,
      }}
    >
      <InlineStack gap="4" align="center">
        <div
          style={{
            color: 'var(--p-color-text-on-color)',
          }}
        >
          <Text as="h2" variant="bodyMd" fontWeight="regular">
            {label}
          </Text>
        </div>
      </InlineStack>
    </div>
  );
};

export default withPolarisExample(BleedSpecificDirectionExample);
