import React, {useState} from 'react';
import {
  ActionList,
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  List,
  Popover,
  Text,
} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardWithMultipleFooterActions() {
  const [actionActive, toggleAction] = useState(false);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };

  const items = [
    {content: 'Cancel shipment', destructive: true},
    {content: 'Add another shipment', disabled: true},
  ];

  const disclosureButtonActivator = (
    <Button disclosure accessibilityLabel="More" onClick={handleToggleAction}>
      More
    </Button>
  );

  const disclosureButton = (
    <Popover
      active={actionActive}
      activator={disclosureButtonActivator}
      onClose={handleToggleAction}
    >
      <ActionList items={items} />
    </Popover>
  );

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Shipment 1234
        </Text>
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Items
          </Text>
          <List>
            <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
            <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
          </List>
        </BlockStack>
        <InlineStack align="end">
          <ButtonGroup>
            {disclosureButton}
            <Button
              variant="primary"
              onClick={() => {}}
              accessibilityLabel="Add tracking number"
            >
              Add tracking number
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}

export default withPolarisExample(CardWithMultipleFooterActions);
