import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  ButtonGroup,
  Frame,
  HorizontalStack,
  Page,
  Toast,
} from '@shopify/polaris';

export default {
  component: Toast,
} as ComponentMeta<typeof Toast>;

export function All() {
  return (
    <HorizontalStack gap="4">
      <Default />
      <WithAction />
      <Error />
      <MultipleMessages />
      <WithCustomDuration />
    </HorizontalStack>
  );
}

export function Default() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Message sent" onDismiss={toggleActive} />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Default">
          <Button onClick={toggleActive}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}

export function MultipleMessages() {
  const [activeOne, setActiveOne] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);

  const toggleActiveOne = useCallback(
    () => setActiveOne((activeOne) => !activeOne),
    [],
  );

  const toggleActiveTwo = useCallback(
    () => setActiveTwo((activeTwo) => !activeTwo),
    [],
  );

  const toastMarkup1 = activeOne ? (
    <Toast content="Message sent" onDismiss={toggleActiveOne} />
  ) : null;

  const toastMarkup2 = activeTwo ? (
    <Toast content="Image uploaded" onDismiss={toggleActiveTwo} />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Multiple Messages">
          <ButtonGroup segmented>
            <Button onClick={toggleActiveOne}>Show toast 1</Button>
            <Button onClick={toggleActiveTwo}>Show toast 2</Button>
          </ButtonGroup>
          {toastMarkup1}
          {toastMarkup2}
        </Page>
      </Frame>
    </div>
  );
}

export function WithCustomDuration() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Message sent" onDismiss={toggleActive} duration={4500} />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Custom Duration">
          <Button onClick={toggleActive}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}

export function WithAction() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast
      content="Image deleted"
      action={{
        content: 'Undo',
        onAction: () => {},
      }}
      duration={10000}
      onDismiss={toggleActive}
    />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Action">
          <Button onClick={toggleActive}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}

export function Error() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Server error" error onDismiss={toggleActive} />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Error">
          <Button onClick={toggleActive}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}
