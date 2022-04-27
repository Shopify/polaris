import { AppProvider, Tag,Stack,Icon } from "@shopify/polaris";
import { WandMinor } from "@shopify/polaris-icons";
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
        <Tag url="/collections/wholesale">
  <Stack spacing="extraTight">
    <Icon source={WandMinor} />
    <span>Wholesale</span>
  </Stack>
</Tag>
      </div>
    </AppProvider>
  );
}

export default Example;
    