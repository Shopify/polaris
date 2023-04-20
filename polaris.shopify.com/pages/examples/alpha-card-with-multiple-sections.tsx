import React from 'react';
import {
  AlphaCard,
  Bleed,
  Box,
  Divider,
  Text,
  VerticalStack,
} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardWithMultipleSectionsExample() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Online store dashboard
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of the performance of your online store.
        </Text>
        <Bleed marginInline={{xs: '4', sm: '5'}}>
          <Divider />
          <Box padding={{xs: '4', sm: '5'}} paddingBlockEnd="0">
            <VerticalStack gap="2">
              <Text as="p" variant="bodyMd">
                View a summary of your online store’s performance, including
                sales, visitors, top products, and referrals.
              </Text>
            </VerticalStack>
          </Box>
        </Bleed>
      </VerticalStack>
    </AlphaCard>
  );
}

export default withPolarisExample(AlphaCardWithMultipleSectionsExample);
