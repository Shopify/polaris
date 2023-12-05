import React from 'react';
import {Bleed, Card, Text, InlineStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BleedHorizontalExample() {
  return (
    <Card>
      <Text as="h2" variant="bodyMd">
        Content inside a card
      </Text>
      <Bleed marginInline="400">
        <Placeholder label="marginInline" />
      </Bleed>
    </Card>
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

export default withPolarisExample(BleedHorizontalExample);
