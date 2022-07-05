import { Link, FooterHelp } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function LinkExample() {
  return (
    <FooterHelp>
      Learn more about <Link url="https://help.shopify.com/manual" external>orders</Link>
    </FooterHelp>
  );
}

export default withPolarisExample(LinkExample);
