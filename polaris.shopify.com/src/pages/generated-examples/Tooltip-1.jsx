import { AppProvider, Tooltip,TextStyle } from "@shopify/polaris";
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
        <div style={{padding: '75px 0'}}>
  <Tooltip active content="This order has shipping labels.">
    <TextStyle variation="strong">Order #1001</TextStyle>
  </Tooltip>
</div>
      </div>
    </AppProvider>
  );
}

export default Example;
    