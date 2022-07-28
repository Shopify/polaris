import { Page, Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function PageExample() {
  return (
    <Page
      title="Product"
      primaryAction={{
        content: "Save",
      }}
      secondaryActions={[
        {
          content: "Import",
          disabled: true,
          helpText: "You need permission to import products.",
        },
      ]}
    />
  );
}

export default withPolarisExample(PageExample);
