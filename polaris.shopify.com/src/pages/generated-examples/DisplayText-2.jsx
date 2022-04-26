import { AppProvider, DisplayText } from "@shopify/polaris";

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
        <DisplayText size="large">Good evening, Dominic.</DisplayText>
      </div>
    </AppProvider>
  );
}

export default Example;
    