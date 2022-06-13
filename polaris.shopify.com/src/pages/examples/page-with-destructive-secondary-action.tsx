import { Page } from "@shopify/polaris";
import React from "react";

<Page
  title="General"
  secondaryActions={[{ content: "Delete", destructive: true }]}
>
  <p>Page content</p>
</Page>;

import { withPolarisExample } from "../../components/PolarisExamplePage";
export default withPolarisExample(() => <p />);
