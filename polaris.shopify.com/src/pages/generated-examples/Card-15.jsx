import { AppProvider, Card,Stack,Icon,Subheading,List } from "@shopify/polaris";
import { ProductsMajor } from "@shopify/polaris-icons";

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
        <Card title="Products">
  <Card.Section
    title={
      <Stack>
        <Icon source={ProductsMajor} />
        <Subheading>New Products</Subheading>
      </Stack>
    }
  >
    <List>
      <List.Item>Socks</List.Item>
      <List.Item>Super Shoes</List.Item>
    </List>
  </Card.Section>
</Card>
      </div>
    </AppProvider>
  );
}

export default Example;
