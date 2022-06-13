import { Link } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function LinkExample() {
  return (
    <Link url="https://help.shopify.com/manual" external>
      Shopify Help Center
    </Link>
  );
}

export default withPolarisExample(LinkExample);
