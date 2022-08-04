import { FormLayout, TextField } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function Example() {
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

export default withPolarisExample(() => <Example />);
