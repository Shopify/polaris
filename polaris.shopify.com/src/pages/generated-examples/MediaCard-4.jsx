import { AppProvider, MediaCard } from "@shopify/polaris";
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
        <MediaCard
          title="Getting Started"
          description="Discover how Shopify can power up your entrepreneurial journey."
          popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
        >
          <img
            alt=""
            width="100%"
            height="100%"
            style={{ objectFit: "cover", objectPosition: "center" }}
            src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
          />
        </MediaCard>
      </div>
    </AppProvider>
  );
}

export default Example;
