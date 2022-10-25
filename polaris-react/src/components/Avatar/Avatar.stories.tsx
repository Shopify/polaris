import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {ActionList, Avatar, Button, Popover, Stack} from '@shopify/polaris';

export default {
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

export function Default() {
  return <Avatar customer name="Farrah" />;
}

export function ExtraSmall() {
  const [active, setActive] = useState(true);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const activator = (
    <Button onClick={toggleActive} disclosure>
      Manage staff
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover active={active} activator={activator} onClose={toggleActive}>
        <ActionList
          items={[
            {
              content: 'Chet Baker',
              prefix: <Avatar customer size="extraSmall" name="Chet Baker" />,
            },
            {
              content: 'Farrah Fawcett',
              prefix: (
                <Avatar customer size="extraSmall" name="Farrah Fawcett" />
              ),
            },
          ]}
        />
      </Popover>
    </div>
  );
}

export function Square() {
  return <Avatar name="Shop One" shape="square" />;
}

export function ExternalImage() {
  return (
    <Avatar
      name="External image"
      shape="square"
      source="https://i.picsum.photos/id/696/200/200.jpg?hmac=JE4lFckorKxM41-eM1nTxXjpOeCf3aZkAxrLl3ZAYI0"
    />
  );
}

export function Sizes() {
  return (
    <Stack>
      <Stack.Item>
        <Avatar customer name="Farrah" size="extraSmall" />
      </Stack.Item>
      <Stack.Item>
        <Avatar customer name="Farrah" size="small" />
      </Stack.Item>
      <Stack.Item>
        <Avatar customer name="Farrah" size="medium" />
      </Stack.Item>
      <Stack.Item>
        <Avatar customer name="Farrah" size="large" />
      </Stack.Item>
    </Stack>
  );
}
