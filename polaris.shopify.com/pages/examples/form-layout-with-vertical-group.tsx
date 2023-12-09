import {FormLayout, TextField} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function Example() {
  return (
    <FormLayout>
      <FormLayout.Group title="Search engine listing" variant="block">
        <TextField
          showCharacterCount
          maxLength={70}
          label="Page title"
          onChange={() => {}}
          autoComplete="off"
        />
        <TextField
          showCharacterCount
          maxLength={320}
          label="Meta description"
          onChange={() => {}}
          autoComplete="off"
        />
        <TextField
          label="URL handle"
          prefix="https://my-awesome-shop.com/products"
          onChange={() => {}}
          autoComplete="off"
        />
      </FormLayout.Group>
    </FormLayout>
  );
}

export default withPolarisExample(Example);
