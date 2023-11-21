import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  Text,
} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardWithSectionsAndDestructiveAction() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="400">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Customer
          </Text>
          <Text as="p" variant="bodyMd">
            John Smith
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <InlineGrid columns="1fr auto">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Contact Information
            </Text>
            <ButtonGroup>
              <Button
                variant="plain"
                tone="critical"
                onClick={() => {}}
                accessibilityLabel="Delete"
              >
                Delete
              </Button>
              <Button
                variant="plain"
                onClick={() => {}}
                accessibilityLabel="Edit"
              >
                Edit
              </Button>
            </ButtonGroup>
          </InlineGrid>
          <Text as="p" variant="bodyMd">
            john.smith@example.com
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}

export default withPolarisExample(CardWithSectionsAndDestructiveAction);
