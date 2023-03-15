import type {ComponentMeta} from '@storybook/react';
import {FormLayout, TextField} from '@shopify/polaris';

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
