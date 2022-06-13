import { Banner } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function BannerExample() {
  return (
    <Banner
      title="Your shipping label is ready to print."
      status="success"
      action={{ content: "Print label" }}
      onDismiss={() => {}}
    />
  );
}

export default withPolarisExample(BannerExample);
