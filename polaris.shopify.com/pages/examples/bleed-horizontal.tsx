import React from 'react';

import {Bleed, Card, Text, HorizontalStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BleedHorizontalExample() {
  return (
    <Card>
      <Text as="h2" variant="bodyMd">
        Content inside a card
      </Text>
      <Bleed marginInline="4">
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
        padding: '14px var(--p-space-2)',
        height: height,
        width: width,
      }}
    >
      <HorizontalStack gap="4" align="center">
        <div
          style={{
            color: 'var(--p-color-text-on-color)',
          }}
        >
          <Text as="h2" variant="bodyMd" fontWeight="regular">
            {label}
          </Text>
        </div>
      </HorizontalStack>
    </div>
  );
};

export default withPolarisExample(BleedHorizontalExample);
