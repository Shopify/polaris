import { AppProvider, Button,Popover,ActionList } from "@shopify/polaris";
import { useState,useCallback } from "react";

import translations from '@shopify/polaris/locales/en.json';
function PopoverWithActionListExample() {
  const [popoverActive, setPopoverActive] = useState(true);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[{content: 'Import'}, {content: 'Export'}]}
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
        <PopoverWithActionListExample />
      </div>
    </AppProvider>
  );
}

export default Example;
