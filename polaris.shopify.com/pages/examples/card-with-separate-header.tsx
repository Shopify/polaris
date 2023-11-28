import React, {useState} from 'react';
import {
  ActionList,
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  List,
  Popover,
  Text,
} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardWithSeparateHeader() {
  const [actionActive, toggleAction] = useState(false);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };

  const items = [{content: 'Member'}, {content: 'Admin'}];

  const disclosureButtonActivator = (
    <Button variant="plain" disclosure onClick={handleToggleAction}>
      Add account
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
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Staff accounts
          </Text>
          <ButtonGroup>
            <Button
              variant="plain"
              onClick={() => {}}
              accessibilityLabel="Preview"
            >
              Preview
            </Button>
            {disclosureButton}
          </ButtonGroup>
        </InlineGrid>
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </BlockStack>
    </Card>
  );
}

export default withPolarisExample(CardWithSeparateHeader);
