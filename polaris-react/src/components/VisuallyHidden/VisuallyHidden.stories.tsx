import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  LegacyCard,
  FormLayout,
  Heading,
  TextField,
  VisuallyHidden,
} from '@shopify/polaris';

export default {
  component: VisuallyHidden,
} as ComponentMeta<typeof VisuallyHidden>;

export function Default() {
  return (
    <LegacyCard sectioned>
      <VisuallyHidden>
        <Heading>Title and description</Heading>
      </VisuallyHidden>
      <FormLayout>
        <TextField
          label="Title"
          value="Artisanal Wooden Spoon"
          onChange={() => {}}
          autoComplete="off"
        />
        <TextField
          label="Description"
          multiline
          onChange={() => {}}
          autoComplete="off"
        />
      </FormLayout>
    </LegacyCard>
  );
}

export function TableHeaders() {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">
            <VisuallyHidden>Line item</VisuallyHidden>
          </th>
          <th scope="col">
            <VisuallyHidden>Value</VisuallyHidden>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Subtotal</th>
          <td>$184.13</td>
        </tr>
        <tr>
          <th scope="row">Tax</th>
          <td>$0.00</td>
        </tr>
        <tr>
          <th scope="row">Total</th>
          <td>$184.13</td>
        </tr>
      </tbody>
    </table>
  );
}
