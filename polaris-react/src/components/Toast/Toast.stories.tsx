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
          <ButtonGroup variant="segmented">
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
