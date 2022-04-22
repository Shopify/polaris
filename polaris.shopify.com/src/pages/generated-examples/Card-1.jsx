import { AppProvider, Card } from "@shopify/polaris";
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
        <Card title="Online store dashboard" sectioned>
  <p>View a summary of your online store’s performance.</p>
</Card>
      </div>
    </AppProvider>
  );
}

export default Example;
    