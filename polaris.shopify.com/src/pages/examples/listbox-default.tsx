import { Listbox } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function BaseListboxExample() {
  return (
    <Listbox accessibilityLabel="Basic Listbox example">
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
      <Listbox.Option value="UniqueValue-3">Item 3</Listbox.Option>
    </Listbox>
  );
}

export default withPolarisExample(BaseListboxExample);
