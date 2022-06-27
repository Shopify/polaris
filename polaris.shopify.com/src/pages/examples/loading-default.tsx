import { Frame, Loading } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function LoadingExample() {
  return (
    <Frame>
      <Loading />
    </Frame>
  );
}

export default withPolarisExample(LoadingExample);
