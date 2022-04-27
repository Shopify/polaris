import { AppProvider, TextField } from "@shopify/polaris";
import { useState,useCallback } from "react";
import translations from '@shopify/polaris/locales/en.json';
function LabelActionExample() {
  const [textFieldValue, setTextFieldValue] = useState('6201.11.0000');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Tariff code"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      labelAction={{content: 'Look up codes'}}
      autoComplete="off"
    />
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
        <LabelActionExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    