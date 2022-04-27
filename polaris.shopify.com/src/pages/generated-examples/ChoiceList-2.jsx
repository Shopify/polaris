import { AppProvider, ChoiceList } from "@shopify/polaris";
import { useState,useCallback } from "react";
import translations from '@shopify/polaris/locales/en.json';
function ChoiceListWithErrorExample() {
  const [selected, setSelected] = useState('hidden');

  const handleChange = useCallback((value) => setSelected(value), []);

  return (
    <ChoiceList
      title="Company name"
      choices={[
        {label: 'Hidden', value: 'hidden', describedByError: true},
        {label: 'Optional', value: 'optional'},
        {label: 'Required', value: 'required'},
      ]}
      selected={selected}
      onChange={handleChange}
      error="Company name cannot be hidden at this time"
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
        <ChoiceListWithErrorExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    