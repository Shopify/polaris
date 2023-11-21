import React from 'react';
import {BlockStack, Box, Card, Text} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardWithSubsection() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="400">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Customer
          </Text>
          <Text as="p" variant="bodyMd">
            John Smith
          </Text>
        </BlockStack>
        <Box>
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Addresses
            </Text>
            <Box>
              <Text as="p" variant="bodyMd">
                123 First St
              </Text>
              <Text as="p" variant="bodyMd">
                Somewhere
              </Text>
              <Text as="p" variant="bodyMd">
                The Universe
              </Text>
            </Box>
            <Box>
              <Text as="p" variant="bodyMd">
                123 Second St
              </Text>
              <Text as="p" variant="bodyMd">
                Somewhere
              </Text>
              <Text as="p" variant="bodyMd">
                The Universe
              </Text>
            </Box>
          </BlockStack>
        </Box>
        <Box>
          <Text as="p" variant="bodyMd">
            A single subsection without a sibling has no visual appearance
          </Text>
        </Box>
      </BlockStack>
    </Card>
  );
}

export default withPolarisExample(CardWithSubsection);
