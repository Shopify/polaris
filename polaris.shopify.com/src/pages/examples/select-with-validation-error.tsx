import { Select } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

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

export default withPolarisExample(ValidationErrorExample);
