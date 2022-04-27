import { AppProvider, Stack,Heading,Badge } from "@shopify/polaris";
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
        <Stack>
  <Stack.Item fill>
    <Heading>Order #1136</Heading>
  </Stack.Item>
  <Stack.Item>
    <Badge>Paid</Badge>
  </Stack.Item>
  <Stack.Item>
    <Badge>Fulfilled</Badge>
  </Stack.Item>
</Stack>
      </div>
    </AppProvider>
  );
}

export default Example;
    