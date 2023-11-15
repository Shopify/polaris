import React from 'react';

import {BlockStack, Bleed, Card, Text, InlineStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BleedSpecificDirectionExample() {
  return (
    <BlockStack gap="600">
      <Card>
        <Bleed marginInlineStart="800">
          <Placeholder label="marginInlineStart" />
        </Bleed>
      </Card>
      <Card>
        <Bleed marginInlineEnd="800">
          <Placeholder label="marginInlineEnd" />
        </Bleed>
      </Card>
      <Card>
        <Bleed marginBlockStart="800">
          <Placeholder label="marginBlockStart" />
        </Bleed>
      </Card>
      <Card>
        <Bleed marginBlockEnd="800">
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
        padding: '14px var(--p-space-200)',
        height: height,
        width: width,
      }}
    >
      <InlineStack gap="400" align="center">
        <div
          style={{
            color: 'var(--p-color-text-info-on-bg-fill)',
          }}
        >
          <Text
            as="h2"
            variant="bodyMd"
            fontWeight="regular"
            tone="text-inverse"
          >
            {label}
          </Text>
        </div>
      </InlineStack>
    </div>
  );
};

export default withPolarisExample(BleedSpecificDirectionExample);
