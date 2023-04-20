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

function AlphaCardWithSubsectionExample() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Customer
        </Text>
        <Text as="p" variant="bodyMd">
          John Smith
        </Text>
        <Bleed marginInline={{xs: '4', sm: '5'}}>
          <Divider />
          <Box padding={{xs: '4', sm: '5'}} paddingBlockEnd="0">
            <Box paddingBlockEnd="2">
              <Text as="h3" variant="headingSm">
                Addresses
              </Text>
            </Box>
            <VerticalStack gap="4">
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
              <Divider />
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
            </VerticalStack>
          </Box>
        </Bleed>
        <Bleed marginInline={{xs: '4', sm: '5'}}>
          <Divider />
          <Box paddingInlineStart="5" paddingBlockStart="5">
            <Text as="p" variant="bodyMd">
              A single subsection without a sibling has no visual appearance
            </Text>
          </Box>
        </Bleed>
      </VerticalStack>
    </AlphaCard>
  );
}

export default withPolarisExample(AlphaCardWithSubsectionExample);
