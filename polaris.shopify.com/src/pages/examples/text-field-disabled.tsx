import { TextField } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function TextFieldExample() {
  return <TextField label="Store name" disabled autoComplete="off" />;
}

export default withPolarisExample(TextFieldExample);
