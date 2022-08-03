import { PageActions } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

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
