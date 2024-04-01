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
import {DeleteIcon, EditIcon} from '@shopify/polaris-icons';

function CardWithSectionsAndCriticalAction() {
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
                icon={DeleteIcon}
                variant="tertiary"
                tone="critical"
                onClick={() => {}}
                accessibilityLabel="Delete"
              />
              <Button
                icon={EditIcon}
                variant="tertiary"
                onClick={() => {}}
                accessibilityLabel="Edit"
              />
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

export default withPolarisExample(CardWithSectionsAndCriticalAction);
