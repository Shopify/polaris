import React from 'react';
import {AlphaStack, Badge, Box, Inline, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithAlignYExample() {
  return (
    <div style={{width: '100%'}}>
      <AlphaStack spacing="2">
        <Text variant="bodySm" as="h3">
          with alignY top
        </Text>

        <Inline alignY="top">
          <Text variant="heading4xl" as="h2">
            Inline
          </Text>
          <Badge>One</Badge>
          <Badge>Two</Badge>
          <Badge>Three</Badge>
        </Inline>
      </AlphaStack>
      <hr />
      <AlphaStack spacing="2">
        <Text variant="bodySm" as="h3">
          with alignY center
        </Text>

        <Inline alignY="center">
          <Text variant="heading4xl" as="h2">
            Inline
          </Text>
          <Badge>One</Badge>
          <Badge>Two</Badge>
          <Badge>Three</Badge>
        </Inline>
      </AlphaStack>

      <hr />

      <AlphaStack spacing="2">
        <Text variant="bodySm" as="h3">
          with alignY bottom
        </Text>

        <Inline alignY="bottom">
          <Text variant="heading4xl" as="h2">
            Inline
          </Text>
          <Badge>One</Badge>
          <Badge>Two</Badge>
          <Badge>Three</Badge>
        </Inline>
      </AlphaStack>

      <hr />

      <AlphaStack spacing="2">
        <Text variant="bodySm" as="h3">
          with alignY baseline
        </Text>

        <Inline alignY="baseline">
          <Text variant="heading4xl" as="h2">
            Inline
          </Text>
          <Badge>One</Badge>
          <Badge>Two</Badge>
          <Badge>Three</Badge>
        </Inline>
      </AlphaStack>
    </div>
  );
}

export default withPolarisExample(InlineWithAlignYExample);
