import { AppProvider, Button } from "@shopify/polaris";
import { ExternalMinor } from "@shopify/polaris-icons";
import '@shopify/polaris/build/esm/styles.css';
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
    