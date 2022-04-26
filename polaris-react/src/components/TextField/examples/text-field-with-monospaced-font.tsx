import { AppProvider, TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';

function TextFieldWithMonospacedFontExample() {
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
      monospaced
    />
  );
}

function Example() {
  return (
    <AppProvider i18n={translations}>
      <TextFieldWithMonospacedFontExample />
    </AppProvider>
  );
}

export default Example;
    