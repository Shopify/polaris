import { AppProvider, ExceptionList } from "@shopify/polaris";
import { NoteMinor } from "@shopify/polaris-icons";

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
        <ExceptionList
  items={[
    {
      icon: NoteMinor,
      description: 'This customer is awesome. Make sure to treat them right!',
    },
  ]}
/>
      </div>
    </AppProvider>
  );
}

export default Example;
