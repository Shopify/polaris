import { FormLayout, TextField } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function Example() {
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

export default withPolarisExample(Example);
