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
        <Card
  title="Shipment 1234"
  secondaryFooterActions={[{content: 'Cancel shipment', destructive: true}]}
  primaryFooterAction={{content: 'Add tracking number'}}
>
  <Card.Section title="Items">
    <List>
      <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
      <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
    </List>
  </Card.Section>
</Card>
      </div>
    </AppProvider>
  );
}

export default Example;
    