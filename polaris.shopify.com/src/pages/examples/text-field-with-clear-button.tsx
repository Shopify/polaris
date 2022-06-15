import { TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function TextFieldWithClearButtonExample() {
  const [textFieldValue, setTextFieldValue] = useState("Jaded Pixel");

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );

  const handleClearButtonClick = useCallback(() => setTextFieldValue(""), []);

  return (
    <TextField
      label="Store name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      clearButton
      onClearButtonClick={handleClearButtonClick}
      autoComplete="off"
    />
  );
}

export default withPolarisExample(TextFieldWithClearButtonExample);
