import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Button, ButtonGroup, Frame, Page, Toast} from '@shopify/polaris';

export default {
  component: Toast,
} as ComponentMeta<typeof Toast>;

export function Default() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Message sent" onDismiss={toggleActive} />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Toast example">
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
        <Page title="Toast example">
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
    <Toast
      content="Message sent lorem ipsum dolor sit amet "
      onDismiss={toggleActive}
      duration={10000000}
    />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Toast example">
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
        <Page title="Toast example">
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
        <Page title="Toast example">
          <Button onClick={toggleActive}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}
