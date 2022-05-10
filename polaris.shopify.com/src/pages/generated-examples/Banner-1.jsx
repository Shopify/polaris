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
        <Banner title="Order archived" onDismiss={() => {}}>
  <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
</Banner>
      </div>
    </AppProvider>
  );
}

export default Example;
    