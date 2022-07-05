import { Link, TextContainer } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function LinkExample() {
  return (
    <TextContainer>
      Learn more about <Link url="https://help.shopify.com/manual" external>orders</Link>
    </TextContainer>
  );
}

export default withPolarisExample(LinkExample);
