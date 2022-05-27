import { AppProvider, TextField, ChoiceList } from "@shopify/polaris";
import { useState, useCallback } from "react";
import translations from "@shopify/polaris/locales/en.json";
function SingleOrMultuChoiceListWithChildrenContextWhenSelectedExample() {
  const [selected, setSelected] = useState(["none"]);
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleChoiceListChange = useCallback((value) => setSelected(value), []);

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );

  const renderChildren = useCallback(
    (isSelected) =>
      isSelected && (
        <TextField
          label="Minimum Quantity"
          labelHidden
          onChange={handleTextFieldChange}
          value={textFieldValue}
          autoComplete="off"
        />
      ),
    [handleTextFieldChange, textFieldValue]
  );

  return (
    <div style={{ height: "150px" }}>
      <ChoiceList
        title="Discount minimum requirements"
        choices={[
          { label: "None", value: "none" },
          { label: "Minimum purchase", value: "minimum_purchase" },
          {
            label: "Minimum quantity",
            value: "minimum_quantity",
            renderChildren,
          },
        ]}
        selected={selected}
        onChange={handleChoiceListChange}
      />
    </div>
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
        <SingleOrMultuChoiceListWithChildrenContextWhenSelectedExample />
      </div>
    </AppProvider>
  );
}

export default Example;
