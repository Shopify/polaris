import React from 'react';
import {AlphaStack, Text, Box} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackExample() {
  return (
    <AlphaStack>
      <Box
        background="action-primary"
        padding="4"
        paddingLeft="2"
        width="320px"
      >
        <Box
          background="surface-primary-selected-pressed"
          color="text-on-interactive"
          width="fit-content"
        >
          <Text as="h2" variant="bodyMd" fontWeight="medium">
            Stack child
          </Text>
        </Box>
      </Box>
      <Box
        background="action-primary"
        padding="4"
        paddingLeft="2"
        width="320px"
      >
        <Box
          background="surface-primary-selected-pressed"
          color="text-on-interactive"
          width="fit-content"
        >
          <Text as="h2" variant="bodyMd" fontWeight="medium">
            Stack child
          </Text>
        </Box>
      </Box>
      <Box
        background="action-primary"
        padding="4"
        paddingLeft="2"
        width="320px"
      >
        <Box
          background="surface-primary-selected-pressed"
          color="text-on-interactive"
          width="fit-content"
        >
          <Text as="h2" variant="bodyMd" fontWeight="medium">
            Stack child
          </Text>
        </Box>
      </Box>
    </AlphaStack>
  );
}

export default withPolarisExample(AlphaStackExample);
