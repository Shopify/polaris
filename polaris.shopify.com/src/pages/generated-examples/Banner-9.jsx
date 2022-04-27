import { AppProvider, Banner } from "@shopify/polaris";
import { useEffect,useRef } from "react";
import translations from '@shopify/polaris/locales/en.json';
function BannerWithFocusExample() {
  const banner = useRef();

  useEffect(() => banner.current.focus(), []);

  return (
    <Banner
      title="High risk of fraud detected"
      onDismiss={() => {}}
      status="critical"
      ref={banner}
    >
      <p>
        Before fulfilling this order or capturing payment, please review the
        fraud analysis and determine if this order is fraudulent
      </p>
    </Banner>
  );
}

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
        <BannerWithFocusExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    