import {FormLayout, TextField} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function VerticalGroupExample() {
  return (
    <FormLayout>
      <FormLayout.Group title="Billing address" variant="block">
        <FormLayout.Group>
          <TextField
            label="First name"
            onChange={() => {}}
            autoComplete="off"
          />
          <TextField label="Last name" onChange={() => {}} autoComplete="off" />
        </FormLayout.Group>

        <TextField
          label="Address line 1"
          onChange={() => {}}
          autoComplete="off"
        />
        <TextField
          label="Address line 2"
          onChange={() => {}}
          autoComplete="off"
        />

        <FormLayout.Group>
          <TextField label="City" onChange={() => {}} autoComplete="off" />
          <TextField label="State" onChange={() => {}} autoComplete="off" />
          <TextField
            type="number"
            label="Zip code"
            onChange={() => {}}
            autoComplete="off"
          />
        </FormLayout.Group>

        <TextField label="Promo code" onChange={() => {}} autoComplete="off" />
      </FormLayout.Group>
    </FormLayout>
  );
}

export default withPolarisExample(VerticalGroupExample);
