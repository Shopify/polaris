import { AppProvider, Banner,Link } from "@shopify/polaris";

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
        <Banner onDismiss={() => {}}>
  <p>
    Use your finance report to get detailed information about your business.{' '}
    <Link url="">Let us know what you think</Link>
  </p>
</Banner>
      </div>
    </AppProvider>
  );
}

export default Example;
