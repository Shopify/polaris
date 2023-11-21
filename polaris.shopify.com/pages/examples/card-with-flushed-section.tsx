import React from 'react';
import {Bleed, Box, Card, Image, Text} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardWithFlushedSection() {
  return (
    <Card roundedAbove="sm">
      <Bleed marginInline="400" marginBlock="400">
        <Image
          source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
          alt="a sheet with purple and orange stripes"
        />
        <Box background="bg-surface-secondary" padding="400">
          <Text as="p" variant="bodyMd">
            You can use sales reports to see information about your customers’
            orders based on criteria such as sales over time, by channel, or by
            staff.
          </Text>
        </Box>
      </Bleed>
    </Card>
  );
}

export default withPolarisExample(CardWithFlushedSection);
