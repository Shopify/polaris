import { AppProvider, TextField } from "@shopify/polaris";
import { useState,useCallback } from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';
function TextFieldWithCharacterCountExample() {
  const [textFieldValue, setTextFieldValue] = useState('Jaded Pixel');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Store name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      maxLength={20}
      autoComplete="off"
      showCharacterCount
    />
  );
}

function Example() {
  return (
    <AppProvider i18n={translations}>
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        <TextFieldWithCharacterCountExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    