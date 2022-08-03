import { Button, Popover, ActionList } from "@shopify/polaris";
import { ImportMinor, ExportMinor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExample";

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

export default withPolarisExample(ActionListWithMediaExample);
