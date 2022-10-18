import React from 'react';
import {Badge, Box, Inline, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithAlignExample() {
  return (
    <div style={{width: '100%'}}>
      <Box paddingBottom="2">
        <Text variant="bodySm" as="h3">
          with align start
        </Text>
      </Box>
      <Box paddingBottom="2">
        <Inline align="start">
          <Text variant="heading4xl" as="h2">
            Inline
          </Text>
          <Badge>One</Badge>
          <Badge>Two</Badge>
          <Badge>Three</Badge>
        </Inline>
      </Box>
      <hr />
      <Box paddingBottom="2">
        <Text variant="bodySm" as="h3">
          with align center
        </Text>
      </Box>
      <Box paddingBottom="2">
        <Inline align="center">
          <Text variant="heading4xl" as="h2">
            Inline
          </Text>
          <Badge>One</Badge>
          <Badge>Two</Badge>
          <Badge>Three</Badge>
        </Inline>
      </Box>
      <hr />
      <Box paddingBottom="2">
        <Text variant="bodySm" as="h3">
          with align end
        </Text>
      </Box>
      <Box paddingBottom="2">
        <Inline align="end">
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

export default withPolarisExample(InlineWithAlignExample);
