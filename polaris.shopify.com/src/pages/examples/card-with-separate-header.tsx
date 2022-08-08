import {Card, Popover, Button, ActionList, List} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function CardExample() {
  return (
    <Card>
      <Card.Header
        actions={[
          {
            content: 'Preview',
          },
        ]}
        title="Staff accounts"
      >
        <Popover
          active
          activator={
            <Button disclosure plain>
              Add account
            </Button>
          }
          onClose={() => {}}
        >
          <ActionList items={[{content: 'Member'}, {content: 'Admin'}]} />
        </Popover>
      </Card.Header>
      <Card.Section>
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </Card.Section>
    </Card>
  );
}

export default withPolarisExample(CardExample);
