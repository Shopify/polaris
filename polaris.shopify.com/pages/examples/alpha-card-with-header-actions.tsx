import React from 'react';
import {
  AlphaCard,
  Button,
  ButtonGroup,
  HorizontalGrid,
  Text,
  VerticalStack,
} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardWithHeaderActionsExample() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <HorizontalGrid columns="1fr auto">
          <Text as="h2" variant="headingMd">
            Variants
          </Text>
          <ButtonGroup>
            <Button plain>Add variant</Button>
          </ButtonGroup>
        </HorizontalGrid>
        <Text as="p" variant="bodyMd">
          Add variants if this product comes in multiple versions, like
          different sizes or colors.
        </Text>
      </VerticalStack>
    </AlphaCard>
  );
}

export default withPolarisExample(AlphaCardWithHeaderActionsExample);
