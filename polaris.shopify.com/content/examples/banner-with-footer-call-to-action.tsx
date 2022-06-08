import { Banner } from "@shopify/polaris";
import React from "react";

<Banner
  title="Some of your product variants are missing weights"
  status="warning"
  action={{ content: "Edit variant weights", url: "" }}
  secondaryAction={{ content: "Learn more", url: "" }}
  onDismiss={() => {}}
>
  <p>
    Add weights to show accurate rates at checkout and when buying shipping
    labels in Shopify.
  </p>
</Banner>;
