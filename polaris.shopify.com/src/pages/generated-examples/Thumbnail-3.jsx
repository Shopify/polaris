import { AppProvider, Thumbnail } from "@shopify/polaris";
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
        <Thumbnail
  source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
  size="large"
  alt="Black choker necklace"
/>
      </div>
    </AppProvider>
  );
}

export default Example;
    