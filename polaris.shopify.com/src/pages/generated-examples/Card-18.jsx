import { AppProvider, Card,List } from "@shopify/polaris";

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
        <Card title="Deactivated staff accounts" sectioned subdued>
  <List>
    <List.Item>Felix Crafford</List.Item>
    <List.Item>Ezequiel Manno</List.Item>
  </List>
</Card>
      </div>
    </AppProvider>
  );
}

export default Example;
