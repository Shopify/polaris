import React from 'react';
import {BlockStack, Box, Card, Text} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardWithMultipleTitledSections() {
  return (
    <Card roundedAbove="sm">
      <Text as="h2" variant="headingSm">
        Online store dashboard
      </Text>
      <Box paddingBlock="200">
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Reports
          </Text>
          <Text as="p" variant="bodyMd">
            View a summary of your online store’s performance.
          </Text>
        </BlockStack>
      </Box>
      <Box paddingBlockStart="200">
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Summary
          </Text>
          <Text as="p" variant="bodyMd">
            View a summary of your online store’s performance, including sales,
            visitors, top products, and referrals.
          </Text>
        </BlockStack>
      </Box>
    </Card>
  );
}

export default withPolarisExample(CardWithMultipleTitledSections);
