import { TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function MultilineFieldExample() {
  const [value, setValue] = useState("1776 Barnes Street\nOrlando, FL 32801");

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <TextField
      label="Shipping address"
      value={value}
      onChange={handleChange}
      multiline={4}
      autoComplete="off"
    />
  );
}

export default withPolarisExample(MultilineFieldExample);
