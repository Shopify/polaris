import { AppProvider, Listbox } from "@shopify/polaris";
import translations from '@shopify/polaris/locales/en.json';
function ListboxWithCustomElementExample() {
  return (
    <Listbox accessibilityLabel="Listbox with custom element example">
      <Listbox.Action value="ActionValue" divider>
        Add item
      </Listbox.Action>
      <Listbox.Option value="UniqueValue-1">
        <div>Item 1</div>
      </Listbox.Option>
      <Listbox.Option value="UniqueValue-2">
        <div>Item 2</div>
      </Listbox.Option>
      <Listbox.Option value="UniqueValue-3">
        <div>Item 3</div>
      </Listbox.Option>
      <Listbox.Loading accessibilityLabel="items are loading" />
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
        <ListboxWithCustomElementExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    