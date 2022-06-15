import { PageActions } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function PageExample() {
  return (
    <PageActions
      primaryAction={{
        content: "Save",
      }}
    />
  );
}

export default withPolarisExample(PageExample);
