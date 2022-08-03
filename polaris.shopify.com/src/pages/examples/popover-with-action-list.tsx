import { Button, Popover, ActionList } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function PopoverWithActionListExample() {
  const [popoverActive, setPopoverActive] = useState(true);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{ height: "250px" }}>
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[{ content: "Import" }, { content: "Export" }]}
        />
      </Popover>
    </div>
  );
}

export default withPolarisExample(PopoverWithActionListExample);
