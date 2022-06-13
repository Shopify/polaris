import { Listbox } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

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

export default withPolarisExample(ListboxWithLoadingExample);
