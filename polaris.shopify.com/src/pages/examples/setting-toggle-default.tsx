import { SettingToggle, TextStyle } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function SettingToggleExample() {
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? "Deactivate" : "Activate";
  const textStatus = active ? "activated" : "deactivated";

  return (
    <SettingToggle
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      enabled={active}
    >
      This setting is <TextStyle variation="strong">{textStatus}</TextStyle>.
    </SettingToggle>
  );
}

export default withPolarisExample(SettingToggleExample);
