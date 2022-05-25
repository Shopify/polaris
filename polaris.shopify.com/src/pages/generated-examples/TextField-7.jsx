import { AppProvider, Stack,TextField } from "@shopify/polaris";
import { useState,useCallback } from "react";
import translations from '@shopify/polaris/locales/en.json';
function RightAlignExample() {
  const [textFieldValue, setTextFieldValue] = useState('1');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
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

function Example() {
  return (
    <AppProvider i18n={translations}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@shopify/polaris@latest/build/esm/styles.css"
      />
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        <RightAlignExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    