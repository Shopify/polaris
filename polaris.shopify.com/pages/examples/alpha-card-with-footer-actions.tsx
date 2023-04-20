import React from 'react';
import {
  AlphaCard,
  Box,
  Button,
  ButtonGroup,
  HorizontalStack,
  List,
  Text,
  VerticalStack,
  secondaryActionsFrom,
} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardWithFooterActionsExample() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Shipment 1234
        </Text>
        <Box>
          <Box paddingBlockEnd="2">
            <Text as="h2" variant="bodyMd" fontWeight="bold">
              Items
            </Text>
          </Box>
          <List>
            <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
            <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
          </List>
        </Box>
        <HorizontalStack align="end">
          <ButtonGroup>
            {secondaryActionsFrom({
              secondaryActions: [{content: 'Edit shipment'}],
            })}
            <Button primary>Add tracking number</Button>
          </ButtonGroup>
        </HorizontalStack>
      </VerticalStack>
    </AlphaCard>
  );
}

export default withPolarisExample(AlphaCardWithFooterActionsExample);
