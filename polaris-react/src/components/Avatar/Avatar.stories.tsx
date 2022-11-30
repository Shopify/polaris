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

export function ExternalImage() {
  return (
    <Avatar
      name="External image"
      shape="square"
      source="https://i.picsum.photos/id/696/200/200.jpg?hmac=JE4lFckorKxM41-eM1nTxXjpOeCf3aZkAxrLl3ZAYI0"
    />
  );
}

export function Square() {
  return <Avatar name="Shop One" shape="square" />;
}

export function SquareWithInitials() {
  return (
    <Stack vertical>
      <Stack.Item>
        <Avatar
          shape="square"
          initials="OE"
          name="Oluwayemisi Eun-Jung"
          size="extraSmall"
        />
      </Stack.Item>
      <Stack.Item>
        <Avatar
          shape="square"
          initials="OE"
          name="Oluwayemisi Eun-Jung"
          size="small"
        />
      </Stack.Item>
      <Stack.Item>
        <Avatar
          shape="square"
          initials="OE"
          name="Oluwayemisi Eun-Jung"
          size="medium"
        />
      </Stack.Item>
      <Stack.Item>
        <Avatar
          shape="square"
          initials="OE"
          name="Oluwayemisi Eun-Jung"
          size="large"
        />
      </Stack.Item>
    </Stack>
  );
}

export function Sizes() {
  return (
    <Stack vertical>
      <Stack.Item>
        <Avatar name="Farrah" size="extraSmall" />
      </Stack.Item>
      <Stack.Item>
        <Avatar name="Farrah" size="small" />
      </Stack.Item>
      <Stack.Item>
        <Avatar name="Farrah" size="medium" />
      </Stack.Item>
      <Stack.Item>
        <Avatar name="Farrah" size="large" />
      </Stack.Item>
    </Stack>
  );
}

export function SizesWithInitials() {
  return (
    <Stack vertical>
      <Stack.Item>
        <Avatar initials="OE" name="Oluwayemisi Eun-Jung" size="extraSmall" />
      </Stack.Item>
      <Stack.Item>
        <Avatar initials="OE" name="Oluwayemisi Eun-Jung" size="small" />
      </Stack.Item>
      <Stack.Item>
        <Avatar initials="OE" name="Oluwayemisi Eun-Jung" size="medium" />
      </Stack.Item>
      <Stack.Item>
        <Avatar initials="OE" name="Oluwayemisi Eun-Jung" size="large" />
      </Stack.Item>
    </Stack>
  );
}
