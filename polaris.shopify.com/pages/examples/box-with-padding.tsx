import React from 'react';
import {Box, Stack, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithPaddingExample() {
  return (
    <Stack vertical>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Box with uniform padding
        </Text>
      </Box>
      <Box
        background="surface"
        borderRadius="2"
        padding="5"
        paddingLeft="2"
        shadow="card"
      >
        <Text as="h2" variant="headingMd">
          Box with left padding overwritten
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" paddingTop="4" shadow="card">
        <Text as="h2" variant="headingMd">
          Box with top padding only
        </Text>
      </Box>
    </Stack>
  );
}

export default withPolarisExample(BoxWithPaddingExample);
