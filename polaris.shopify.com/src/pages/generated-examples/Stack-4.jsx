import { AppProvider, Stack,Heading,Badge } from "@shopify/polaris";

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
        <Stack alignment="center">
  <Heading>
    Order
    <br />
    #1136
    <br />
    was paid
  </Heading>
  <Badge>Paid</Badge>
  <Badge>Fulfilled</Badge>
</Stack>
      </div>
    </AppProvider>
  );
}

export default Example;
