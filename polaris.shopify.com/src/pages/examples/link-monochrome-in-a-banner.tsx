import { Banner, Link } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function LinkExample() {
  return (
    <Banner>
      Learn more about{" "}
      <Link url="https://help.shopify.com/manual">fulfilling orders</Link>
    </Banner>
  );
}

export default withPolarisExample(LinkExample);
