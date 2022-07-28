import { Icon, Select } from "@shopify/polaris";
import { CaretUpMinor, CaretDownMinor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function PrefixExample() {
  const [selected, setSelected] = useState("enabled");

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    {
      label: "Increase",
      value: "Increase",
      prefix: <Icon source={CaretUpMinor} />,
    },
    {
      label: "Decrease",
      value: "Decrease",
      prefix: <Icon source={CaretDownMinor} />,
    },
  ];

  return (
    <Select
      label="Permission"
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}

export default withPolarisExample(PrefixExample);
