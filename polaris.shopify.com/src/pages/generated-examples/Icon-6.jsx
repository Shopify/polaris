import { AppProvider, Icon } from "@shopify/polaris";
import { OrdersMajor } from "@shopify/polaris-icons";

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
        <Icon source={OrdersMajor} />
<p>No orders yet</p>
      </div>
    </AppProvider>
  );
}

export default Example;
