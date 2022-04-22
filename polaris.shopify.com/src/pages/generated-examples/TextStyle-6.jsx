import { AppProvider, TextStyle } from "@shopify/polaris";

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
        <p>
  New URL that visitors should be forwarded to. If you want your store’s
  homepage, enter <TextStyle variation="code"> / </TextStyle> (a forward slash).
</p>
      </div>
    </AppProvider>
  );
}

export default Example;
