import {FormLayout, TextField} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function NestedGroupExample() {
  return (
    <FormLayout>
      <FormLayout.Group title="Default group">
        <TextField
          type="number"
          label="Input 1"
          onChange={() => {}}
          autoComplete="off"
        />
        <TextField
          type="number"
          label="Input 2"
          onChange={() => {}}
          autoComplete="off"
        />
      </FormLayout.Group>

      <FormLayout.Group title="Default group with many inputs">
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
        <TextField label="Input 1" onChange={() => {}} autoComplete="off" />
        <TextField label="Input 2" onChange={() => {}} autoComplete="off" />
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

export default withPolarisExample(NestedGroupExample);
