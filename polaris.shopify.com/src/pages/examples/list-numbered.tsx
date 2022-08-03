import { List } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function ListExample() {
  return (
    <List type="number">
      <List.Item>First item</List.Item>
      <List.Item>Second item</List.Item>
      <List.Item>Third Item</List.Item>
    </List>
  );
}

export default withPolarisExample(ListExample);
