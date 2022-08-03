import { PageActions } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function PageExample() {
  return (
    <PageActions
      primaryAction={{
        content: "Save",
      }}
      secondaryActions={[
        {
          content: "Delete",
          destructive: true,
        },
      ]}
    />
  );
}

export default withPolarisExample(PageExample);
