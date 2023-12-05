import React from 'react';
import {Bleed, Card, Text, InlineStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BleedVerticalExample() {
  return (
    <Card>
      <Bleed marginBlock="800">
        <Placeholder label="marginBlock" />
      </Bleed>
    </Card>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding: 'var(--p-space-1000) var(--p-space-200)',
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

export default withPolarisExample(BleedVerticalExample);
