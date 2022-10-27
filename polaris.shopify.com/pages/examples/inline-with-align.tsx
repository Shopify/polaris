import React from 'react';
import {AlphaStack, Badge, Inline, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithAlignExample() {
  return (
    <div style={{width: '100%'}}>
      <AlphaStack spacing="2">
        <Text variant="bodySm" as="h3">
          with align start
        </Text>

        <Inline align="start">
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
          with align center
        </Text>

        <Inline align="center">
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
          with align end
        </Text>

        <Inline align="end">
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

export default withPolarisExample(InlineWithAlignExample);
