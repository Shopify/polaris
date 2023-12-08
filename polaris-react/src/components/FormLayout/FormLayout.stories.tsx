import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Card, FormLayout, TextField, Text, BlockStack} from '@shopify/polaris';

export default {
  component: FormLayout,
} as ComponentMeta<typeof FormLayout>;

export function Default() {
  return (
    <FormLayout>
      <TextField
        label="Ungrouped input 1"
        onChange={() => {}}
        autoComplete="off"
      />
      <TextField
        label="Ungrouped input 2"
        onChange={() => {}}
        autoComplete="email"
      />
      <TextField
        label="Ungrouped input 3"
        onChange={() => {}}
        autoComplete="email"
      />
    </FormLayout>
  );
}

export function WithGroups() {
  return (
    <FormLayout>
      <FormLayout.Group title="Default group">
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

      <FormLayout.Group title="Default group 2">
        <TextField label="Input 1" onChange={() => {}} autoComplete="off" />
        <TextField label="Input 2" onChange={() => {}} autoComplete="off" />
        <TextField label="Input 3" onChange={() => {}} autoComplete="off" />
        <TextField label="Input 4" onChange={() => {}} autoComplete="off" />
      </FormLayout.Group>

      <FormLayout.Group condensed title="Condensed group">
        <TextField label="Input 1" onChange={() => {}} autoComplete="off" />
        <TextField label="Input 2" onChange={() => {}} autoComplete="off" />
        <TextField label="Input 3" onChange={() => {}} autoComplete="off" />
        <TextField label="Input 4" onChange={() => {}} autoComplete="off" />
      </FormLayout.Group>

      <FormLayout.Group title="Vertical group" variant="block">
        <TextField
          type="number"
          label="Available"
          onChange={() => {}}
          autoComplete="off"
        />
        <TextField
          type="number"
          label="Incoming"
          onChange={() => {}}
          autoComplete="off"
        />
      </FormLayout.Group>

      <FormLayout.Group
        title="Group with all of its elements"
        helpText="Group help text"
      >
        <TextField
          label="Input 1 label"
          onChange={() => {}}
          autoComplete="off"
          helpText="Input 1 help text"
        />
        <TextField
          label="Input 2 label"
          onChange={() => {}}
          autoComplete="off"
          helpText="Input 2 help text"
        />
      </FormLayout.Group>
    </FormLayout>
  );
}

export function All() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="400">
        <Text as="h2" variant="headingSm">
          Card title
        </Text>
        <FormLayout>
          <TextField
            label="Ungrouped input 1"
            onChange={() => {}}
            autoComplete="off"
          />
          <TextField
            label="Ungrouped input 2"
            onChange={() => {}}
            autoComplete="email"
          />
          <TextField
            label="Ungrouped input 3"
            onChange={() => {}}
            autoComplete="email"
          />

          <FormLayout.Group title="Default group">
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

          <TextField
            label="Ungrouped input 4"
            onChange={() => {}}
            autoComplete="email"
          />

          <FormLayout.Group title="Default group 2">
            <TextField label="Input 1" onChange={() => {}} autoComplete="off" />
            <TextField label="Input 2" onChange={() => {}} autoComplete="off" />
            <TextField label="Input 3" onChange={() => {}} autoComplete="off" />
            <TextField label="Input 4" onChange={() => {}} autoComplete="off" />
          </FormLayout.Group>

          <FormLayout.Group condensed title="Condensed group">
            <TextField label="Input 1" onChange={() => {}} autoComplete="off" />
            <TextField label="Input 2" onChange={() => {}} autoComplete="off" />
            <TextField label="Input 3" onChange={() => {}} autoComplete="off" />
            <TextField label="Input 4" onChange={() => {}} autoComplete="off" />
          </FormLayout.Group>

          <FormLayout.Group title="Vertical group" variant="block">
            <TextField
              type="number"
              label="Available"
              onChange={() => {}}
              autoComplete="off"
            />
            <TextField
              type="number"
              label="Incoming"
              onChange={() => {}}
              autoComplete="off"
            />
          </FormLayout.Group>

          <FormLayout.Group
            title="Group with all of its elements"
            helpText="Group help text"
          >
            <TextField
              label="Input 1 label"
              onChange={() => {}}
              autoComplete="off"
              helpText="Input 1 help text"
            />
            <TextField
              label="Input 2 label"
              onChange={() => {}}
              autoComplete="off"
              helpText="Input 2 help text"
            />
          </FormLayout.Group>

          <TextField
            label="Ungrouped input 5"
            onChange={() => {}}
            autoComplete="email"
          />
          <TextField
            label="Ungrouped input 6"
            onChange={() => {}}
            autoComplete="email"
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
}
