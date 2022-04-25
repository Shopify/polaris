import { AppProvider, FormLayout,TextField } from "@shopify/polaris";

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
  <FormLayout.Group condensed>
    <TextField label="Length" onChange={() => {}} autoComplete="off" />
    <TextField label="Width" onChange={() => {}} autoComplete="off" />
    <TextField label="Height" onChange={() => {}} autoComplete="off" />
    <TextField label="Unit" onChange={() => {}} autoComplete="off" />
  </FormLayout.Group>
</FormLayout>
      </div>
    </AppProvider>
  );
}

export default Example;
