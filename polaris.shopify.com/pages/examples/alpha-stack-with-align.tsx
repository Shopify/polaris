import React from 'react';
import {AlphaStack, Box, Text, Page} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithAlignExample() {
  return (
    <Page>
      <AlphaStack align="start">
        <Box background="action-primary" padding="4" paddingLeft="2">
          <Box
            background="surface-primary-selected-pressed"
            color="text-on-interactive"
          >
            <Text
              as="h2"
              variant="bodyMd"
              fontWeight="medium"
              alignment="start"
            >
              Start
            </Text>
          </Box>
        </Box>
        <Box background="action-primary" padding="4" paddingLeft="2">
          <Box
            background="surface-primary-selected-pressed"
            color="text-on-interactive"
          >
            <Text as="h2" variant="bodyMd" fontWeight="medium">
              Stack child
            </Text>
          </Box>
        </Box>
        <Box background="action-primary" padding="4" paddingLeft="2">
          <Box
            background="surface-primary-selected-pressed"
            color="text-on-interactive"
          >
            <Text as="h2" variant="bodyMd" fontWeight="medium">
              Stack child
            </Text>
          </Box>
        </Box>
      </AlphaStack>
      <AlphaStack align="center">
        <Box background="action-primary" padding="4" paddingLeft="2">
          <Box
            background="surface-primary-selected-pressed"
            color="text-on-interactive"
          >
            <Text as="h2" variant="bodyMd" fontWeight="medium">
              Center
            </Text>
          </Box>
        </Box>
        <Box background="action-primary" padding="4" paddingLeft="2">
          <Box
            background="surface-primary-selected-pressed"
            color="text-on-interactive"
          >
            <Text as="h2" variant="bodyMd" fontWeight="medium">
              Stack child
            </Text>
          </Box>
        </Box>
        <Box background="action-primary" padding="4" paddingLeft="2">
          <Box
            background="surface-primary-selected-pressed"
            color="text-on-interactive"
          >
            <Text as="h2" variant="bodyMd" fontWeight="medium">
              Stack child
            </Text>
          </Box>
        </Box>
      </AlphaStack>
      <AlphaStack align="end">
        <Box background="action-primary" padding="4" paddingLeft="2">
          <Box
            background="surface-primary-selected-pressed"
            color="text-on-interactive"
          >
            <Text as="h2" variant="bodyMd" fontWeight="medium">
              End
            </Text>
          </Box>
        </Box>
        <Box background="action-primary" padding="4" paddingLeft="2">
          <Box
            background="surface-primary-selected-pressed"
            color="text-on-interactive"
          >
            <Text as="h2" variant="bodyMd" fontWeight="medium">
              Stack child
            </Text>
          </Box>
        </Box>
        <Box background="action-primary" padding="4" paddingLeft="2">
          <Box
            background="surface-primary-selected-pressed"
            color="text-on-interactive"
          >
            <Text as="h2" variant="bodyMd" fontWeight="medium">
              Stack child
            </Text>
          </Box>
        </Box>
      </AlphaStack>
    </Page>
  );
}

export default withPolarisExample(AlphaStackWithAlignExample);
