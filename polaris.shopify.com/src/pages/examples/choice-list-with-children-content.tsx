import { TextField, ChoiceList } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function SingleOrMultiChoiceListWithChildrenContextExample() {
  const [selected, setSelected] = useState(["none"]);
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleChoiceListChange = useCallback((value) => setSelected(value), []);

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );

  const renderChildren = useCallback(
    () => (
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
  );
}

export default withPolarisExample(
  SingleOrMultiChoiceListWithChildrenContextExample
);
