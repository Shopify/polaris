import { AppProvider, Select } from "@shopify/polaris";
import { useState, useCallback } from "react";
import translations from "@shopify/polaris/locales/en.json";
function ValidationErrorExample() {
  const [selected, setSelected] = useState("");

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  return (
    <Select
      label="Province"
      options={["Alberta"]}
      value={selected}
      onChange={handleSelectChange}
      error="Province is required"
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
        <ValidationErrorExample />
      </div>
    </AppProvider>
  );
}

export default Example;
