import { Banner, List } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function BannerExample() {
  return (
    <Banner
      title="Before you can purchase a shipping label, this change needs to be made:"
      action={{ content: "Edit address" }}
      status="warning"
    >
      <List>
        <List.Item>
          The name of the city you’re shipping to has characters that aren’t
          allowed. City name can only include spaces and hyphens.
        </List.Item>
      </List>
    </Banner>
  );
}

export default withPolarisExample(BannerExample);
