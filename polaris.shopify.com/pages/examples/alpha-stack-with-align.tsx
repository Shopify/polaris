import React from 'react';
import {AlphaStack, Badge, Box, Inline, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithAlignExample() {
  return (
    <div style={{width: '500px'}}>
      <Box paddingBottom="2">
        <Text variant="bodySm" as="h3">
          with align start
        </Text>
      </Box>
      <Box paddingBottom="2">
        <AlphaStack align="start">
          <Text variant="heading4xl" as="h2">
            AlphaStack
          </Text>
          <Inline>
            <Badge>One</Badge>
            <Badge>Two</Badge>
            <Badge>Three</Badge>
          </Inline>
        </AlphaStack>
      </Box>
      <hr />
      <Box paddingBottom="2">
        <Text variant="bodySm" as="h3">
          with align center
        </Text>
      </Box>
      <Box paddingBottom="2">
        <AlphaStack align="center">
          <Text variant="heading4xl" as="h2">
            AlphaStack
          </Text>
          <Inline>
            <Badge>One</Badge>
            <Badge>Two</Badge>
            <Badge>Three</Badge>
          </Inline>
        </AlphaStack>
      </Box>
      <hr />
      <Box paddingBottom="2">
        <Text variant="bodySm" as="h3">
          with align end
        </Text>
      </Box>
      <Box paddingBottom="2">
        <AlphaStack align="end">
          <Text variant="heading4xl" as="h2">
            AlphaStack
          </Text>
          <Inline>
            <Badge>One</Badge>
            <Badge>Two</Badge>
            <Badge>Three</Badge>
          </Inline>
        </AlphaStack>
      </Box>
    </div>
  );
}

export default withPolarisExample(AlphaStackWithAlignExample);
