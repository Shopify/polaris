import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Card, FormLayout, TextField, VerticalStack} from '@shopify/polaris';

export default {
  component: FormLayout,
} as ComponentMeta<typeof FormLayout>;

export function Default() {
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
}

export function FieldGroup() {
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
}

export function CondensedFieldGroup() {
  return (
    <FormLayout>
      <FormLayout.Group condensed>
        <TextField label="Length" onChange={() => {}} autoComplete="off" />
        <TextField label="Width" onChange={() => {}} autoComplete="off" />
        <TextField label="Height" onChange={() => {}} autoComplete="off" />
        <TextField label="Unit" onChange={() => {}} autoComplete="off" />
      </FormLayout.Group>
    </FormLayout>
  );
}

export function All() {
  return (
    <VerticalStack gap="5">
      <Card>
        <FormLayout>
          <FormLayout.Group
            title="Default group 1"
            helpText="Form group help text"
          >
            <TextField label="Length" onChange={() => {}} autoComplete="off" />
            <TextField label="Width" onChange={() => {}} autoComplete="off" />
          </FormLayout.Group>
          <FormLayout.Group title="Default group 2">
            <TextField label="Length" onChange={() => {}} autoComplete="off" />
            <TextField label="Width" onChange={() => {}} autoComplete="off" />
            <TextField label="Height" onChange={() => {}} autoComplete="off" />
            <TextField label="Unit" onChange={() => {}} autoComplete="off" />
          </FormLayout.Group>
        </FormLayout>
      </Card>
      <Card>
        <FormLayout>
          <FormLayout.Group
            condensed
            title="Condensed"
            helpText="Form group help text"
          >
            <TextField label="Length" onChange={() => {}} autoComplete="off" />
            <TextField label="Width" onChange={() => {}} autoComplete="off" />
            <TextField label="Height" onChange={() => {}} autoComplete="off" />
          </FormLayout.Group>
        </FormLayout>
      </Card>
      <Card>
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
    </VerticalStack>
  );
}
