import { AppProvider, Icon } from "@shopify/polaris";
import { CirclePlusMinor } from "@shopify/polaris-icons";
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
        <div>
  <Icon source={CirclePlusMinor} color="base" backdrop />
  <Icon source={CirclePlusMinor} color="highlight" backdrop />
  <Icon source={CirclePlusMinor} color="success" backdrop />
  <Icon source={CirclePlusMinor} color="warning" backdrop />
  <Icon source={CirclePlusMinor} color="critical" backdrop />
</div>
      </div>
    </AppProvider>
  );
}

export default Example;
    