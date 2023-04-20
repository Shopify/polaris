import React from 'react';
import {
  AlphaCard,
  Button,
  ButtonGroup,
  HorizontalGrid,
  List,
  Text,
  VerticalStack,
  secondaryActionsFrom,
} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardWithSeparateHeaderExample() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <HorizontalGrid columns="1fr auto">
          <Text as="h2" variant="headingMd">
            Staff accounts
          </Text>
          <ButtonGroup>
            <Button plain>Preview</Button>
            {secondaryActionsFrom({
              secondaryActions: [{content: 'Member'}, {content: 'Admin'}],
              secondaryActionsDisclosureText: 'Add account',
              plainButton: true,
            })}
          </ButtonGroup>
        </HorizontalGrid>
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </VerticalStack>
    </AlphaCard>
  );
}

export default withPolarisExample(AlphaCardWithSeparateHeaderExample);
