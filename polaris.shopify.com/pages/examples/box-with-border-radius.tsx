import React from 'react';
import {Box, Stack, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithBorderRadiusExample() {
  return (
    <Stack vertical>
      <Box
        background="surface"
        border="base"
        borderRadius="2"
        padding="5"
        shadow="card"
      >
        <Text as="h2" variant="headingMd">
          Box with uniform border radius
        </Text>
      </Box>
      <Box
        background="surface"
        border="base"
        borderRadiusBottomLeft="2"
        borderRadiusBottomRight="2"
        padding="5"
        shadow="card"
      >
        <Text as="h2" variant="headingMd">
          Box with bottom border radius
        </Text>
      </Box>
      <Box
        background="surface"
        border="base"
        borderRadius="base"
        padding="5"
        shadow="card"
      >
        <Text as="h2" variant="headingMd">
          Box with border radius base
        </Text>
      </Box>
    </Stack>
  );
}

export default withPolarisExample(BoxWithBorderRadiusExample);
