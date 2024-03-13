import {FormLayout, TextField} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function Example() {
  return (
    <FormLayout>
      <FormLayout.Group presentational>
        <TextField label="City" onChange={() => {}} autoComplete="off" />
        <TextField label="State" onChange={() => {}} autoComplete="off" />
        <TextField
          type="number"
          label="Zip code"
          onChange={() => {}}
          autoComplete="off"
        />
      </FormLayout.Group>
    </FormLayout>
  );
}

export default withPolarisExample(Example);
