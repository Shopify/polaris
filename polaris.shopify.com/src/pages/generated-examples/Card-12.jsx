import { AppProvider, Card,List } from "@shopify/polaris";
import translations from '@shopify/polaris/locales/en.json';

function Example() {
  return (
    <AppProvider i18n={translations}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@shopify/polaris@latest/build/esm/styles.css"
      />
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        <Card title="Staff accounts">
  <Card.Section>
    <List>
      <List.Item>Felix Crafford</List.Item>
      <List.Item>Ezequiel Manno</List.Item>
    </List>
  </Card.Section>

  <Card.Section subdued title="Deactivated staff accounts">
    <List>
      <List.Item>Felix Crafford</List.Item>
      <List.Item>Ezequiel Manno</List.Item>
    </List>
  </Card.Section>
</Card>
      </div>
    </AppProvider>
  );
}

export default Example;
    