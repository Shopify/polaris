import React from 'react';
import {AlphaStack, Box, Text, Page, Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithAlignExample() {
  return (
    <Page>
      <Box paddingBottom="20">
        <AlphaStack align="start">
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
              <Text
                as="h2"
                variant="bodyMd"
                fontWeight="medium"
                alignment="start"
              >
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
              <Text
                as="h2"
                variant="bodyMd"
                fontWeight="medium"
                alignment="start"
              >
                Stack child
              </Text>
            </Box>
          </Box>
        </AlphaStack>
      </Box>
      <Box paddingBottom="20">
        <AlphaStack align="center">
          <Box
            background="action-primary"
            padding="4"
            paddingLeft="2"
            width="320px"
          >
            <Inline align="center">
              <Box
                background="surface-primary-selected-pressed"
                color="text-on-interactive"
                width="fit-content"
              >
                <Text
                  as="h2"
                  variant="bodyMd"
                  fontWeight="medium"
                  alignment="center"
                >
                  Center
                </Text>
              </Box>
            </Inline>
          </Box>
          <Box
            background="action-primary"
            padding="4"
            paddingLeft="2"
            width="320px"
          >
            <Inline align="center">
              <Box
                background="surface-primary-selected-pressed"
                color="text-on-interactive"
                width="fit-content"
              >
                <Text
                  as="h2"
                  variant="bodyMd"
                  fontWeight="medium"
                  alignment="center"
                >
                  Stack Child
                </Text>
              </Box>
            </Inline>
          </Box>
          <Box
            background="action-primary"
            padding="4"
            paddingLeft="2"
            width="320px"
          >
            <Inline align="center">
              <Box
                background="surface-primary-selected-pressed"
                color="text-on-interactive"
                width="fit-content"
              >
                <Text
                  as="h2"
                  variant="bodyMd"
                  fontWeight="medium"
                  alignment="center"
                >
                  Stack Child
                </Text>
              </Box>
            </Inline>
          </Box>
        </AlphaStack>
      </Box>
      <Box>
        <AlphaStack align="end">
          <Box
            background="action-primary"
            padding="4"
            paddingRight="2"
            width="320px"
          >
            <Inline align="end">
              <Box
                background="surface-primary-selected-pressed"
                color="text-on-interactive"
                width="fit-content"
              >
                <Text
                  as="h2"
                  variant="bodyMd"
                  fontWeight="medium"
                  alignment="center"
                >
                  End
                </Text>
              </Box>
            </Inline>
          </Box>
          <Box
            background="action-primary"
            padding="4"
            paddingRight="2"
            width="320px"
          >
            <Inline align="end">
              <Box
                background="surface-primary-selected-pressed"
                color="text-on-interactive"
                width="fit-content"
              >
                <Text
                  as="h2"
                  variant="bodyMd"
                  fontWeight="medium"
                  alignment="center"
                >
                  Stack Child
                </Text>
              </Box>
            </Inline>
          </Box>
          <Box
            background="action-primary"
            padding="4"
            paddingRight="2"
            width="320px"
          >
            <Inline align="end">
              <Box
                background="surface-primary-selected-pressed"
                color="text-on-interactive"
                width="fit-content"
              >
                <Text
                  as="h2"
                  variant="bodyMd"
                  fontWeight="medium"
                  alignment="center"
                >
                  Stack Child
                </Text>
              </Box>
            </Inline>
          </Box>
        </AlphaStack>
      </Box>
    </Page>
  );
}

export default withPolarisExample(AlphaStackWithAlignExample);
