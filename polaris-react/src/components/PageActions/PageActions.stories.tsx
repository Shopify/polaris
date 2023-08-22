import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Button, PageActions} from '@shopify/polaris';

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
          tone: 'critical',
          variant: 'primary',
        },
      ]}
    />
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
          variant="primary"
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
          tone: 'critical',
          variant: 'primary',
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
