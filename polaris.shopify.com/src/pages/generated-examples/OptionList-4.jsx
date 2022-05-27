import { AppProvider, Button, Popover, OptionList } from "@shopify/polaris";
import { useState, useCallback } from "react";
import translations from "@shopify/polaris/locales/en.json";
function OptionListInPopoverExample() {
  const [selected, setSelected] = useState([]);
  const [popoverActive, setPopoverActive] = useState(true);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Options
    </Button>
  );

  return (
    <div style={{ height: "275px" }}>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
      >
        <OptionList
          title="Inventory Location"
          onChange={setSelected}
          options={[
            {
              value: "byward_market",
              label: "Byward Market",
              active: true,
            },
            { value: "centretown", label: "Centretown" },
            {
              value: "hintonburg",
              label: "Hintonburg",
              active: true,
            },
            { value: "westboro", label: "Westboro" },
            { value: "downtown", label: "Downtown" },
          ]}
          selected={selected}
        />
      </Popover>
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
        <OptionListInPopoverExample />
      </div>
    </AppProvider>
  );
}

export default Example;
