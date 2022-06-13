import { FooterHelp, Link } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function FooterHelpExample() {
  return (
    <FooterHelp>
      Learn more about{" "}
      <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
        fulfilling orders
      </Link>
    </FooterHelp>
  );
}

export default withPolarisExample(FooterHelpExample);
