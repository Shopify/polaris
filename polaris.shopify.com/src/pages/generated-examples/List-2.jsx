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
        <List type="number">
  <List.Item>First item</List.Item>
  <List.Item>Second item</List.Item>
  <List.Item>Third Item</List.Item>
</List>
      </div>
    </AppProvider>
  );
}

export default Example;
