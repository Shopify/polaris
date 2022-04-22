import { AppProvider, Banner } from "@shopify/polaris";

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
        <Banner
  title="Your shipping label is ready to print."
  status="success"
  action={{content: 'Print label'}}
  onDismiss={() => {}}
/>
      </div>
    </AppProvider>
  );
}

export default Example;
