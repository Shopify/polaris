import { AppProvider, TextField } from "@shopify/polaris";
import { useState,useCallback } from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';
function MultilineFieldExample() {
  const [value, setValue] = useState('1776 Barnes Street\nOrlando, FL 32801');

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
        <MultilineFieldExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    