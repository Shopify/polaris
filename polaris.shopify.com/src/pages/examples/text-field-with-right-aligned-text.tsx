import { Stack, TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function RightAlignExample() {
  const [textFieldValue, setTextFieldValue] = useState("1");

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );

  return (
    <Stack>
      <Stack.Item fill>Price</Stack.Item>
      <TextField
        label="Price"
        labelHidden
        value={textFieldValue}
        onChange={handleTextFieldChange}
        autoComplete="off"
        align="right"
      />
    </Stack>
  );
}

export default withPolarisExample(RightAlignExample);
