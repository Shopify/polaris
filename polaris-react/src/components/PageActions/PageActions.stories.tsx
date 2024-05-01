import React from 'react';
import type {Meta} from '@storybook/react';
import {Button, PageActions} from '@shopify/polaris';

export default {
  component: PageActions,
} as Meta<typeof PageActions>;

export const Default = {
  render() {
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
  },
};

export const PrimaryActionOnly = {
  render() {
    return (
      <PageActions
        primaryAction={{
          content: 'Save',
        }}
      />
    );
  },
};

export const WithCustomPrimaryAction = {
  render() {
    return (
      <PageActions
        primaryAction={<Button variant="primary">Save</Button>}
        secondaryActions={[
          {
            content: 'Delete',
            destructive: true,
          },
        ]}
      />
    );
  },
};

export const WithCustomSecondaryAction = {
  render() {
    return (
      <PageActions
        primaryAction={{
          content: 'Save',
        }}
        secondaryActions={<Button>Save</Button>}
      />
    );
  },
};
