import React from 'react';
import {AlphaStack, Badge, Box, Inline, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithSpacingExample() {
  return (
    <div style={{width: '100%'}}>
      <Box paddingBottom="2">
        <Text variant="bodySm" as="h3">
          with spacing 0
        </Text>
      </Box>
      <Box paddingBottom="2">
        <AlphaStack spacing="0">
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
          with spacing 4
        </Text>
      </Box>
      <Box paddingBottom="2">
        <AlphaStack spacing="4">
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
          with spacing 10
        </Text>
      </Box>
      <Box paddingBottom="2">
        <AlphaStack spacing="10">
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

export default withPolarisExample(AlphaStackWithSpacingExample);
