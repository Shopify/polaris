import { AppProvider, Card,OptionList } from "@shopify/polaris";
import { useState } from "react";

import translations from '@shopify/polaris/locales/en.json';
function OptionListExample() {
  const [selected, setSelected] = useState([]);

  return (
    <Card>
      <OptionList
        title="Inventory Location"
        onChange={setSelected}
        options={[
          {value: 'byward_market', label: 'Byward Market'},
          {value: 'centretown', label: 'Centretown'},
          {value: 'hintonburg', label: 'Hintonburg'},
          {value: 'westboro', label: 'Westboro'},
          {value: 'downtown', label: 'Downtown'},
        ]}
        selected={selected}
      />
    </Card>
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
        <OptionListExample />
      </div>
    </AppProvider>
  );
}

export default Example;
