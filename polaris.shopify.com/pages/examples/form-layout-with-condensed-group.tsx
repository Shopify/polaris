import {FormLayout, TextField, Select} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function Example() {
  return (
    <FormLayout>
      <FormLayout.Group
        condensed
        title="Dimensions"
        helpText="Dimensional weight greater than 150lbs may be charged an oversize fee by the carrier"
      >
        <TextField
          type="number"
          label="Length"
          onChange={() => {}}
          autoComplete="off"
        />
        <TextField
          type="number"
          label="Width"
          onChange={() => {}}
          autoComplete="off"
        />
        <TextField
          type="number"
          label="Height"
          onChange={() => {}}
          autoComplete="off"
        />
        <Select
          label="Unit"
          options={[
            {label: 'cm', value: 'cm'},
            {label: 'in', value: 'in'},
          ]}
          onChange={() => {}}
          value="in"
        />
        <TextField
          type="number"
          label="Weight (optional)"
          onChange={() => {}}
          autoComplete="off"
        />
        <Select
          label="Unit"
          options={[
            {label: 'g', value: 'g'},
            {label: 'kg', value: 'kg'},
            {label: 'oz', value: 'oz'},
            {label: 'lb', value: 'lb'},
          ]}
          onChange={() => {}}
          value="lb"
        />
      </FormLayout.Group>
    </FormLayout>
  );
}

export default withPolarisExample(Example);
