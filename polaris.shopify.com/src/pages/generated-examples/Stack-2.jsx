import { AppProvider, Stack, Badge } from "@shopify/polaris";
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
        <Stack wrap={false}>
          <Badge>Paid</Badge>
          <Badge>Processing</Badge>
          <Badge>Fulfilled</Badge>
          <Badge>Completed</Badge>
        </Stack>
      </div>
    </AppProvider>
  );
}

export default Example;
