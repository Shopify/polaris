import { AppProvider, FormLayout,TextField } from "@shopify/polaris";
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
        <FormLayout>
  <TextField label="Store name" onChange={() => {}} autoComplete="off" />
  <TextField
    type="email"
    label="Account email"
    onChange={() => {}}
    autoComplete="email"
  />
</FormLayout>
      </div>
    </AppProvider>
  );
}

export default Example;
    