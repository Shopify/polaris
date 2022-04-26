import { AppProvider, Icon,Select } from "@shopify/polaris";
import { CaretUpMinor,CaretDownMinor } from "@shopify/polaris-icons";
import { useState,useCallback } from "react";

import translations from '@shopify/polaris/locales/en.json';
function PrefixExample() {
  const [selected, setSelected] = useState('enabled');

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    {
      label: 'Increase',
      value: 'Increase',
      prefix: <Icon source={CaretUpMinor} />,
    },
    {
      label: 'Decrease',
      value: 'Decrease',
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
        <PrefixExample />
      </div>
    </AppProvider>
  );
}

export default Example;
