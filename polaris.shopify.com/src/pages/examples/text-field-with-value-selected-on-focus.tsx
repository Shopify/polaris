import { TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function TextFieldWithSelectTextOnFocusExample() {
  const [textFieldValue, setTextFieldValue] = useState("Jaded Pixel");

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );

  return (
    <TextField
      label="Store name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      selectTextOnFocus
    />
  );
}

export default withPolarisExample(TextFieldWithSelectTextOnFocusExample);
