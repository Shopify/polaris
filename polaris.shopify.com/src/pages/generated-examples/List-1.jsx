import { AppProvider, List } from "@shopify/polaris";

import translations from '@shopify/polaris/locales/en.json';

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
        <List type="bullet">
  <List.Item>Yellow shirt</List.Item>
  <List.Item>Red shirt</List.Item>
  <List.Item>Green shirt</List.Item>
</List>
      </div>
    </AppProvider>
  );
}

export default Example;
