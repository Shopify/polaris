import { AppProvider, Banner,Link } from "@shopify/polaris";
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
  title="High risk of fraud detected"
  action={{content: 'Review risk analysis'}}
  status="critical"
>
  <p>
    Before fulfilling this order or capturing payment, please{' '}
    <Link url="">review the Risk Analysis</Link> and determine if this order is
    fraudulent.
  </p>
</Banner>
      </div>
    </AppProvider>
  );
}

export default Example;
    