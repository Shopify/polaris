import React from 'react';
import {
  AlphaCard,
  Button,
  ButtonGroup,
  HorizontalStack,
  Text,
  VerticalStack,
  secondaryActionsFrom,
} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardWithCustomFooterActionsExample() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Secure your account with 2-step authentication
        </Text>
        <Text as="p" variant="bodyMd">
          Two-step authentication adds an extra layer of security when logging
          in to your account. A special code will be required each time you log
          in, ensuring only you can access your account.
        </Text>
        <HorizontalStack align="end">
          <ButtonGroup>
            {secondaryActionsFrom({
              secondaryActions: [{content: 'Enable two-step authentication'}],
            })}
            <Button plain>Learn more</Button>
          </ButtonGroup>
        </HorizontalStack>
      </VerticalStack>
    </AlphaCard>
  );
}

export default withPolarisExample(AlphaCardWithCustomFooterActionsExample);
