import { Tag } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function TagExample() {
  return <Tag onClick={() => console.log("Clicked")}>Wholesale</Tag>;
}

export default withPolarisExample(TagExample);
