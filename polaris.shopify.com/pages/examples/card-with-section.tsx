import React from 'react';
import {Box, Card, Text} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardWithSection() {
  return (
    <Card roundedAbove="sm">
      <Text as="h2" variant="headingSm">
        Online store dashboard
      </Text>
      <Box paddingBlockStart="200">
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s performance.
        </Text>
      </Box>
    </Card>
  );
}

export default withPolarisExample(CardWithSection);
