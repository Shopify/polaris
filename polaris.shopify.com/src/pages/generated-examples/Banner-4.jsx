import { AppProvider, Banner } from "@shopify/polaris";
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
        <Banner
  title="USPS has updated their rates"
  action={{content: 'Update rates', url: ''}}
  secondaryAction={{content: 'Learn more'}}
  status="info"
  onDismiss={() => {}}
>
  <p>Make sure you know how these changes affect your store.</p>
</Banner>
      </div>
    </AppProvider>
  );
}

export default Example;
    