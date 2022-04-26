import { AppProvider, ButtonGroup,Button } from "@shopify/polaris";

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
        <ButtonGroup segmented>
  <Button outline>Bold</Button>
  <Button outline>Italic</Button>
  <Button outline>Underline</Button>
</ButtonGroup>
      </div>
    </AppProvider>
  );
}

export default Example;
