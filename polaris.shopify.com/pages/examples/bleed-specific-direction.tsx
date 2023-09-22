import React from 'react';

import {
  VerticalStack,
  Bleed,
  Card,
  Text,
  HorizontalStack,
} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BleedSpecificDirectionExample() {
  return (
    <VerticalStack gap="6">
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
    </VerticalStack>
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

export default withPolarisExample(BleedSpecificDirectionExample);
