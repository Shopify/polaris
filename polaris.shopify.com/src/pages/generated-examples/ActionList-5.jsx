import { AppProvider, Button,Popover,ActionList } from "@shopify/polaris";
import { ImportMinor,ExportMinor,DeleteMinor } from "@shopify/polaris-icons";
import { useState,useCallback } from "react";

import translations from '@shopify/polaris/locales/en.json';
function ActionListWithDestructiveItemExample() {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          sections={[
            {
              title: 'File options',
              items: [
                {
                  active: true,
                  content: 'Import file',
                  icon: ImportMinor,
                },
                {content: 'Export file', icon: ExportMinor},
                {
                  destructive: true,
                  content: 'Delete file',
                  icon: DeleteMinor,
                },
              ],
            },
          ]}
        />
      </Popover>
    </div>
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
        <ActionListWithDestructiveItemExample />
      </div>
    </AppProvider>
  );
}

export default Example;
