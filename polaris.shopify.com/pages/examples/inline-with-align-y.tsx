import React from 'react';
import {Badge, Box, Inline, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithAlignYExample() {
  return (
    <div style={{width: '500px'}}>
      <Box marginBottom="2">
        <Text variant="bodySm" as="h3">
          with alignY top
        </Text>
      </Box>
      <Box paddingBottom="2">
        <Inline alignY="top">
          <Text variant="heading4xl" as="h2">
            Inline
          </Text>
          <Badge>One</Badge>
          <Badge>Two</Badge>
          <Badge>Three</Badge>
        </Inline>
      </Box>
      <hr />
      <Box marginBottom="2">
        <Text variant="bodySm" as="h3">
          with alignY center
        </Text>
      </Box>
      <Box paddingBottom="2">
        <Inline alignY="center">
          <Text variant="heading4xl" as="h2">
            Inline
          </Text>
          <Badge>One</Badge>
          <Badge>Two</Badge>
          <Badge>Three</Badge>
        </Inline>
      </Box>
      <hr />
      <Box marginBottom="2">
        <Text variant="bodySm" as="h3">
          with alignY bottom
        </Text>
      </Box>
      <Box paddingBottom="2">
        <Inline alignY="bottom">
          <Text variant="heading4xl" as="h2">
            Inline
          </Text>
          <Badge>One</Badge>
          <Badge>Two</Badge>
          <Badge>Three</Badge>
        </Inline>
      </Box>
      <hr />
      <Box marginBottom="2">
        <Text variant="bodySm" as="h3">
          with alignY baseline
        </Text>
      </Box>
      <Box paddingBottom="2">
        <Inline alignY="baseline">
          <Text variant="heading4xl" as="h2">
            Inline
          </Text>
          <Badge>One</Badge>
          <Badge>Two</Badge>
          <Badge>Three</Badge>
        </Inline>
      </Box>
    </div>
  );
}

export default withPolarisExample(InlineWithAlignYExample);
