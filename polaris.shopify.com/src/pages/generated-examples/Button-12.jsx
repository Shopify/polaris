import { AppProvider, Button } from "@shopify/polaris";
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
        <Button plain textAlign="left">
          This is a really long string of text that overflows onto the next line
          we need to put in a lot of words now you can see the alignment. It is
          very long but a customer could potentially name something this long.
        </Button>
      </div>
    </AppProvider>
  );
}

export default Example;
