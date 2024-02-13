import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  ButtonGroup,
  Frame,
  InlineStack,
  Page,
  Toast,
  Modal,
  BlockStack,
  TextContainer,
} from '@shopify/polaris';
import {MagicIcon} from '@shopify/polaris-icons';

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
        <Page title="Default">
          <Button onClick={toggleActive}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}

export function MultipleMessages() {
  const [activeToasts, setActiveToasts] = useState<number[]>([]);

  const toggleActive = (id: number) =>
    setActiveToasts((activeToasts) => {
      const isToastActive = activeToasts.includes(id);
      return isToastActive
        ? activeToasts.filter((activeToast) => activeToast !== id)
        : [...activeToasts, id];
    });

  const toggleActiveOne = useCallback(() => toggleActive(1), []);

  const toggleActiveTwo = useCallback(() => toggleActive(2), []);

  const toggleActiveThree = useCallback(() => toggleActive(3), []);

  const toggleActiveFour = useCallback(() => toggleActive(4), []);

  const toggleActiveFive = useCallback(() => toggleActive(5), []);

  const toggleActiveSix = useCallback(() => toggleActive(6), []);

  const toastDuration = 5000;

  const toastMarkup1 = activeToasts.includes(1) ? (
    <Toast
      content="Message sent 1"
      onDismiss={toggleActiveOne}
      duration={toastDuration}
    />
  ) : null;

  const toastMarkup2 = activeToasts.includes(2) ? (
    <Toast
      content="Image uploaded 2"
      onDismiss={toggleActiveTwo}
      duration={toastDuration}
    />
  ) : null;

  const toastMarkup3 = activeToasts.includes(3) ? (
    <Toast
      content="Notification sent 3"
      onDismiss={toggleActiveThree}
      duration={toastDuration}
    />
  ) : null;

  const toastMarkup4 = activeToasts.includes(4) ? (
    <Toast
      content="Content updated 4"
      onDismiss={toggleActiveFour}
      duration={toastDuration}
    />
  ) : null;

  const toastMarkup5 = activeToasts.includes(5) ? (
    <Toast
      content="Server error 5"
      error
      onDismiss={toggleActiveFive}
      duration={toastDuration}
    />
  ) : null;

  const toastMarkup6 = activeToasts.includes(6) ? (
    <Toast
      content="Sidekick enabled 6"
      tone="magic"
      onDismiss={toggleActiveSix}
      duration={toastDuration}
    />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Multiple Messages">
          <ButtonGroup variant="segmented">
            <Button onClick={toggleActiveOne}>Show toast 1</Button>
            <Button onClick={toggleActiveTwo}>Show toast 2</Button>
            <Button onClick={toggleActiveThree}>Show toast 3</Button>
            <Button onClick={toggleActiveFour}>Show toast 4</Button>
            <Button onClick={toggleActiveFive}>Show toast 5 (error)</Button>
            <Button onClick={toggleActiveSix}>Show toast 6 (Magic) </Button>
          </ButtonGroup>
          {toastMarkup1}
          {toastMarkup2}
          {toastMarkup3}
          {toastMarkup4}
          {toastMarkup5}
          {toastMarkup6}
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

export function InsideModal() {
  const [toastActive, setToastActive] = useState(false);
  const [toast2Active, setToast2Active] = useState(false);
  const [modalActive, setModalActive] = useState(true);

  const handleChange = useCallback(
    () => setModalActive(!modalActive),
    [modalActive],
  );

  const toggleActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    [],
  );

  const toggle2Active = useCallback(
    () => setToast2Active((toastActive) => !toastActive),
    [],
  );

  const activator = <Button onClick={handleChange}>Open</Button>;

  const toastMarkup = toastActive ? (
    <Toast content="Message sent" onDismiss={toggleActive} />
  ) : null;

  const toast2Markup = toast2Active ? (
    <Toast content="Another sent" onDismiss={toggle2Active} />
  ) : null;

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Page title="Default">
          {toastMarkup}
          {toast2Markup}
          <Modal
            activator={activator}
            open={modalActive}
            onClose={handleChange}
            title="Reach more shoppers with Instagram product tags"
            primaryAction={{
              content: 'Add Instagram',
              onAction: handleChange,
            }}
            secondaryActions={[
              {
                content: 'Learn more',
                onAction: handleChange,
              },
            ]}
          >
            <Modal.Section>
              <BlockStack gap="200">
                <TextContainer>
                  Use Instagram posts to share your products with millions of
                  people. Let shoppers buy from your store without leaving
                  Instagram.
                </TextContainer>
                <InlineStack gap="200">
                  <Button onClick={toggleActive}>Show Toast</Button>
                  <Button onClick={toggle2Active}>Show Other Toast</Button>
                </InlineStack>
              </BlockStack>
            </Modal.Section>
          </Modal>
        </Page>
      </Frame>
    </div>
  );
}

export function Magic() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast
      content="Magic message"
      onDismiss={toggleActive}
      tone="magic"
      duration={3000000}
    />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Default">
          <Button onClick={toggleActive}>Show Magic Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}

export function WithOnClick() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Message Toast" onClick={toggleActive} duration={3000000} />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Default">
          <Button onClick={toggleActive}>Show Magic Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}

export function MagicWithOnClick() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast
      content="Magic message"
      tone="magic"
      duration={3000000}
      icon={MagicIcon}
      onClick={toggleActive}
    />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Default">
          <Button onClick={toggleActive}>Show Magic Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}
