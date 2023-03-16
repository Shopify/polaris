import React, {useState, useCallback, useRef} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  PageActions,
  Modal,
  TextContainer,
  Text,
} from '@shopify/polaris';

export default {
  component: PageActions,
} as ComponentMeta<typeof PageActions>;

export function Default() {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
      }}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
        },
      ]}
    />
  );
}

export function WithActivatorRef() {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <PageActions
        primaryAction={{
          content: 'Save',
        }}
        secondaryActions={[
          {
            content: 'Delete product',
            outline: true,
            destructive: true,
            ref: buttonRef,
            onAction: () => setActive(true),
          },
        ]}
      />
      <div style={{height: '500px'}}>
        <Modal
          activator={buttonRef}
          open={active}
          onClose={handleChange}
          title="Delete 3/4 inch Leather pet collar?"
          primaryAction={{
            content: 'Delete product',
            onAction: handleChange,
          }}
          secondaryActions={[{content: 'Cancel', onAction: handleChange}]}
        >
          <Modal.Section>
            <Text variant="bodyMd" as="p">
              Are you sure you want to delete{' '}
              <Text as="span" fontWeight="bold">
                3/4 inch Leather pet collar
              </Text>
              ? This can&apos;t be undone.
            </Text>
          </Modal.Section>
        </Modal>
      </div>
    </>
  );
}

export function PrimaryActionOnly() {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
      }}
    />
  );
}

export function WithCustomPrimaryAction() {
  return (
    <PageActions
      primaryAction={
        <Button
          primary
          connectedDisclosure={{
            accessibilityLabel: 'Other save actions',
            actions: [{content: 'Save as draft'}],
          }}
        >
          Save
        </Button>
      }
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
        },
      ]}
    />
  );
}

export function WithCustomSecondaryAction() {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
      }}
      secondaryActions={
        <Button
          connectedDisclosure={{
            accessibilityLabel: 'Other save actions',
            actions: [{content: 'Save as draft'}],
          }}
        >
          Save
        </Button>
      }
    />
  );
}
