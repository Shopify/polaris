import { AppProvider, Listbox,Stack,Icon } from "@shopify/polaris";
import { CirclePlusMinor } from "@shopify/polaris-icons";
import translations from '@shopify/polaris/locales/en.json';
function ListboxWithActionExample() {
  return (
    <Listbox accessibilityLabel="Listbox with Action example">
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2" divider>
        Item 2
      </Listbox.Option>
      <Listbox.Action value="ActionValue">
        <Stack spacing="tight">
          <Icon source={CirclePlusMinor} color="base" />
          <div>Add item</div>
        </Stack>
      </Listbox.Action>
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
        <ListboxWithActionExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    