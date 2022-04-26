import { AppProvider, PageActions } from "@shopify/polaris";

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
        <PageActions
  primaryAction={{
    content: 'Save',
  }}
  secondaryActions={[
    {
      content: 'Delete',
      destructive: true,
    },
  ]}
/>
      </div>
    </AppProvider>
  );
}

export default Example;
