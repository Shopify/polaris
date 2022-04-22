import { AppProvider, Button } from "@shopify/polaris";
import { CirclePlusMinor } from "@shopify/polaris-icons";
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
        <Button icon={CirclePlusMinor}>Add a product</Button>
      </div>
    </AppProvider>
  );
}

export default Example;
    