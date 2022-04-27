import { AppProvider, Button } from "@shopify/polaris";
import { ExternalMinor } from "@shopify/polaris-icons";
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
        <Button
  accessibilityLabel="Terms and conditions (opens a new window)"
  icon={ExternalMinor}
  url="http://example.com"
  external
>
  Terms and conditions
</Button>
      </div>
    </AppProvider>
  );
}

export default Example;
    