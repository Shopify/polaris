import { Button, Popover, ActionList } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function PopoverContentExample() {
  const [popoverActive, setPopoverActive] = useState(true);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Sales channels
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
        <Popover.Pane fixed>
          <Popover.Section>
            <p>Available sales channels</p>
          </Popover.Section>
        </Popover.Pane>
        <Popover.Pane>
          <ActionList
            actionRole="menuitem"
            items={[
              { content: "Online store" },
              { content: "Facebook" },
              { content: "Shopify POS" },
            ]}
          />
        </Popover.Pane>
      </Popover>
    </div>
  );
}

export default withPolarisExample(PopoverContentExample);
