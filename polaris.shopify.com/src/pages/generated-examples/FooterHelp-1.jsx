import { AppProvider, FooterHelp,Link } from "@shopify/polaris";
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
        <FooterHelp>
  Learn more about{' '}
  <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
    fulfilling orders
  </Link>
</FooterHelp>
      </div>
    </AppProvider>
  );
}

export default Example;
    