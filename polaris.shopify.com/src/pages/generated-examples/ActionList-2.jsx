import { AppProvider, Button, Popover, ActionList } from "@shopify/polaris";
import { ImportMinor, ExportMinor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import translations from "@shopify/polaris/locales/en.json";
function ActionListWithMediaExample() {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{ height: "200px" }}>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            { content: "Import file", icon: ImportMinor },
            { content: "Export file", icon: ExportMinor },
          ]}
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
        <ActionListWithMediaExample />
      </div>
    </AppProvider>
  );
}

export default Example;
