import { Banner } from "@shopify/polaris";
import React from "react";

<Banner
  title="USPS has updated their rates"
  action={{ content: "Update rates", url: "" }}
  secondaryAction={{ content: "Learn more" }}
  status="info"
  onDismiss={() => {}}
>
  <p>Make sure you know how these changes affect your store.</p>
</Banner>;
