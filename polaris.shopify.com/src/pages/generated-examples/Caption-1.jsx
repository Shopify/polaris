import { AppProvider, List,Caption } from "@shopify/polaris";

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
        <List>
  <List.Item>
    Order #1001 <Caption>Received April 21, 2017</Caption>
  </List.Item>
  <List.Item>
    Order #1002 <Caption>Received April 22, 2017</Caption>
  </List.Item>
</List>
      </div>
    </AppProvider>
  );
}

export default Example;
