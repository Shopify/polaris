import { InlineError } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function InlineErrorExample() {
  return <InlineError message="Store name is required" fieldID="myFieldID" />;
}

export default withPolarisExample(InlineErrorExample);
