import { AppProvider, Tag } from "@shopify/polaris";

import translations from '@shopify/polaris/locales/en.json';
function URLTagExample() {
  return <Tag url="/collections/wholesale">Wholesale</Tag>;
}

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
        <URLTagExample />
      </div>
    </AppProvider>
  );
}

export default Example;
