import React from 'react';
import {
  AlphaCard,
  Bleed,
  Box,
  Button,
  ButtonGroup,
  HorizontalGrid,
  Divider,
  Text,
  VerticalStack,
} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardWithDestructiveActionExample() {
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
            <VerticalStack gap="2">
              <HorizontalGrid columns="1fr auto">
                <Text as="h3" variant="headingSm">
                  Contact information
                </Text>
                <ButtonGroup>
                  <Button plain destructive>
                    Delete
                  </Button>
                  <Button plain>Edit</Button>
                </ButtonGroup>
              </HorizontalGrid>
              <Text as="p" variant="bodyMd">
                john.smith@example.com
              </Text>
            </VerticalStack>
          </Box>
        </Bleed>
      </VerticalStack>
    </AlphaCard>
  );
}

export default withPolarisExample(AlphaCardWithDestructiveActionExample);
