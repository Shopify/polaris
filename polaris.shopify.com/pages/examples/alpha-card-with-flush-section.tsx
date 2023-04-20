import React from 'react';
import {
  AlphaCard,
  Bleed,
  Box,
  Divider,
  Image,
  Text,
  VerticalStack,
} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardWithFlushSectionExample() {
  return (
    <AlphaCard roundedAbove="sm">
      <Bleed marginInline={{xs: '4', sm: '5'}} marginBlock={{xs: '4', sm: '5'}}>
        <Image
          source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
          alt="a sheet with purple and orange stripes"
        />
        <Divider />
        <Box padding={{xs: '4', sm: '5'}}>
          <VerticalStack gap="2">
            <Text as="p" variant="bodyMd">
              You can use sales reports to see information about your customers’
              orders based on criteria such as sales over time, by channel, or
              by staff.
            </Text>
          </VerticalStack>
        </Box>
      </Bleed>
    </AlphaCard>
  );
}

export default withPolarisExample(AlphaCardWithFlushSectionExample);
