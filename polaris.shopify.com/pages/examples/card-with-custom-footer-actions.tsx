import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  Text,
} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardWithCustomFooterActions() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="500">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Secure your account with 2-step authentication
          </Text>
          <Text as="p" variant="bodyMd">
            Two-step authentication adds an extra layer of security when logging
            in to your account. A special code will be required each time you
            log in, ensuring only you can access your account.
          </Text>
        </BlockStack>
        <InlineStack align="end">
          <ButtonGroup>
            <Button
              onClick={() => {}}
              accessibilityLabel="Enable two-step authentication"
            >
              Enable two-step authentication
            </Button>
            <Button variant="plain">Learn more</Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}

export default withPolarisExample(CardWithCustomFooterActions);
