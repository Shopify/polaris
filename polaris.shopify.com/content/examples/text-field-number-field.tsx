import { TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";

function NumberFieldExample() {
  const [value, setValue] = useState("1");

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <TextField
      label="Quantity"
      type="number"
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
}
