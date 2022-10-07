import React from 'react';
import {Box, Stack, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithBackgroundExample() {
  return (
    <Stack vertical>
      <Box background="background" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Box with background
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Box with background surface
        </Text>
      </Box>
      <Box background="overlay" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Box with background overlay
        </Text>
      </Box>
      <Box background="backdrop" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Box with background backdrop
        </Text>
      </Box>
    </Stack>
  );
}

export default withPolarisExample(BoxWithBackgroundExample);
