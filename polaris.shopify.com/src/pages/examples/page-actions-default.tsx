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

import { withPolarisExample } from "../../components/PolarisExamplePage";
export default withPolarisExample(() => <p>tk</p>);
