import { AppProvider, Card,EmptyState } from "@shopify/polaris";

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
        <Card sectioned>
  <EmptyState
    heading="Manage your inventory transfers"
    action={{content: 'Add transfer'}}
    secondaryAction={{content: 'Learn more', url: 'https://help.shopify.com'}}
    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
  >
    <p>Track and receive your incoming inventory from suppliers.</p>
  </EmptyState>
</Card>
      </div>
    </AppProvider>
  );
}

export default Example;
