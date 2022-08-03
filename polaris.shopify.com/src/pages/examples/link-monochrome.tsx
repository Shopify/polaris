import { Link } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function LinkExample() {
  return (
    <Link monochrome url="https://help.shopify.com/manual">
      fulfilling orders
    </Link>
  );
}

export default withPolarisExample(LinkExample);
