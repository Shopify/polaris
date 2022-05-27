import { AppProvider, Card, OptionList } from "@shopify/polaris";
import { useState } from "react";
import translations from "@shopify/polaris/locales/en.json";
function MultipleOptionListExample() {
  const [selected, setSelected] = useState([]);

  return (
    <Card>
      <OptionList
        title="Manage sales channels availability"
        onChange={setSelected}
        options={[
          { value: "online_store", label: "Online Store" },
          { value: "messenger", label: "Messenger" },
          { value: "facebook", label: "Facebook" },
          { value: "wholesale", label: "Wholesale" },
          { value: "buzzfeed", label: "BuzzFeed" },
        ]}
        selected={selected}
        allowMultiple
      />
    </Card>
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
        <MultipleOptionListExample />
      </div>
    </AppProvider>
  );
}

export default Example;
