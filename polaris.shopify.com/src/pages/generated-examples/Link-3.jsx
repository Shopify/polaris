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
        <Banner>
  Learn more about{' '}
  <Link url="https://help.shopify.com/manual">fulfilling orders</Link>
</Banner>
      </div>
    </AppProvider>
  );
}

export default Example;
