import { AppProvider, Listbox } from "@shopify/polaris";
import translations from '@shopify/polaris/locales/en.json';
function ListboxWithLoadingExample() {
  return (
    <Listbox accessibilityLabel="Listbox with loading example">
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
      <Listbox.Option value="UniqueValue-3">Item 3</Listbox.Option>
      <Listbox.Loading />
    </Listbox>
  );
}

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
        <ListboxWithLoadingExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    