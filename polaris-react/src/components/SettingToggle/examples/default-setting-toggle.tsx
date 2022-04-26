import { AppProvider, SettingToggle, TextStyle } from "@shopify/polaris";
import { useState, useCallback } from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';

function SettingToggleExample() {
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? 'Deactivate' : 'Activate';
  const textStatus = active ? 'activated' : 'deactivated';

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

function Example() {
  return (
    <AppProvider i18n={translations}>
      <SettingToggleExample />
    </AppProvider>
  );
}

export default Example;
    