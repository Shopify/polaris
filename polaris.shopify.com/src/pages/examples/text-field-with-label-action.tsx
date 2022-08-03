import { TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function LabelActionExample() {
  const [textFieldValue, setTextFieldValue] = useState("6201.11.0000");

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );

  return (
    <TextField
      label="Tariff code"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      labelAction={{ content: "Look up codes" }}
      autoComplete="off"
    />
  );
}

export default withPolarisExample(LabelActionExample);
