import { PageActions } from "@shopify/polaris";
import React from "react";

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
/>;
