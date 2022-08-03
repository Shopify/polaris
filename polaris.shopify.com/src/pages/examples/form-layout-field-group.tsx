import { FormLayout, TextField } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function Example() {
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

export default withPolarisExample(Example);
