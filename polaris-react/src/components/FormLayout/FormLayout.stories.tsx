import React from 'react';
import type {Meta} from '@storybook/react';
import {Card, FormLayout, TextField, Text, BlockStack} from '@shopify/polaris';

export default {
  component: FormLayout,
} as Meta<typeof FormLayout>;

export const Default = {
  render() {
    return (
      <FormLayout>
        <TextField label="Store name" onChange={() => {}} autoComplete="off" />
        <TextField
          type="email"
          label="Account email"
          onChange={() => {}}
          autoComplete="email"
        />
      </FormLayout>
    );
  },
};

export const FieldGroup = {
  render() {
    return (
      <FormLayout>
        <FormLayout.Group>
          <TextField
            type="number"
            label="Minimum order"
            onChange={() => {}}
            autoComplete="off"
          />
          <TextField
            type="number"
            label="Maximum order"
            onChange={() => {}}
            autoComplete="off"
          />
        </FormLayout.Group>
      </FormLayout>
    );
  },
};

export const CondensedFieldGroup = {
  render() {
    return (
      <FormLayout>
        <FormLayout.Group condensed>
          <TextField label="Input 1" onChange={() => {}} autoComplete="off" />
          <TextField label="Input 2" onChange={() => {}} autoComplete="off" />
          <TextField label="Input 3" onChange={() => {}} autoComplete="off" />
          <TextField label="Input 4" onChange={() => {}} autoComplete="off" />
        </FormLayout.Group>
      </FormLayout>
    );
  },
};

export const All = {
  render() {
    return (
      <BlockStack gap="500">
        <Card roundedAbove="sm">
          <BlockStack gap="400">
            <Text as="h2" variant="headingSm">
              Card title
            </Text>
            <FormLayout>
              <FormLayout.Group
                title="Default group 1"
                helpText="Form group help text"
              >
                <TextField
                  label="Input 1"
                  onChange={() => {}}
                  autoComplete="off"
                />
                <TextField
                  label="Input 2"
                  onChange={() => {}}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <FormLayout.Group title="Default group 2">
                <TextField
                  label="Input 1"
                  onChange={() => {}}
                  autoComplete="off"
                />
                <TextField
                  label="Input 2"
                  onChange={() => {}}
                  autoComplete="off"
                />
                <TextField
                  label="Input 3"
                  onChange={() => {}}
                  autoComplete="off"
                />
                <TextField
                  label="Input 4"
                  onChange={() => {}}
                  autoComplete="off"
                />
              </FormLayout.Group>
            </FormLayout>
          </BlockStack>
        </Card>
        <Card roundedAbove="sm">
          <FormLayout>
            <FormLayout.Group
              condensed
              title="Condensed group"
              helpText="Form group help text"
            >
              <TextField
                label="Input 1"
                onChange={() => {}}
                autoComplete="off"
              />
              <TextField
                label="Input 2"
                onChange={() => {}}
                autoComplete="off"
              />
              <TextField
                label="Input 3"
                onChange={() => {}}
                autoComplete="off"
              />
            </FormLayout.Group>
          </FormLayout>
        </Card>
        <Card roundedAbove="sm">
          <FormLayout>
            <FormLayout.Group
              title="Form group title"
              helpText="Form group help text"
            >
              <TextField
                label="Field label"
                onChange={() => {}}
                autoComplete="off"
                helpText="Field help text"
              />
            </FormLayout.Group>
          </FormLayout>
        </Card>
      </BlockStack>
    );
  },
};
