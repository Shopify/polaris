import { AppProvider, TextContainer } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";

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
        <TextContainer spacing="loose">
          <p>
            Manage your Shopify store on-the-go with real-time notifications,
            access to your dashboard, and order management, all from your
            smartphone.
          </p>
          <p>
            Shopify POS is the fastest and easiest way to start accepting Visa,
            Mastercard, American Express, and Discover right from your
            smartphone or tablet.
          </p>
        </TextContainer>
      </div>
    </AppProvider>
  );
}

export default Example;
