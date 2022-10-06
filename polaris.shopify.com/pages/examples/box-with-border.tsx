import React from 'react';
import {Box, Stack, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithBorderExample() {
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
          Box with border base
        </Text>
      </Box>
      <Box
        background="surface"
        border="divider"
        borderRadius="2"
        padding="5"
        shadow="card"
      >
        <Text as="h2" variant="headingMd">
          Box with border divider
        </Text>
      </Box>
      <Box
        background="surface"
        border="dark"
        borderRadius="2"
        padding="5"
        shadow="card"
      >
        <Text as="h2" variant="headingMd">
          Box with border dark
        </Text>
      </Box>
      <Box
        background="surface"
        border="transparent"
        borderRadius="2"
        padding="5"
        shadow="card"
      >
        <Text as="h2" variant="headingMd">
          Box with border transparent
        </Text>
      </Box>
      <Box
        background="surface"
        border="divider-on-dark"
        borderRadius="2"
        padding="5"
        shadow="card"
      >
        <Text as="h2" variant="headingMd">
          Box with border divider on dark
        </Text>
      </Box>
    </Stack>
  );
}

export default withPolarisExample(BoxWithBorderExample);
