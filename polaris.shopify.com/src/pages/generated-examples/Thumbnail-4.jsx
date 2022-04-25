import { AppProvider, Thumbnail } from "@shopify/polaris";
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
        <Thumbnail source={NoteMinor} size="large" alt="Small document" />
      </div>
    </AppProvider>
  );
}

export default Example;
