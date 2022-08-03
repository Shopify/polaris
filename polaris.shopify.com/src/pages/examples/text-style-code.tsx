import { TextStyle } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function TextStyleExample() {
  return (
    <p>
      New URL that visitors should be forwarded to. If you want your store’s
      homepage, enter <TextStyle variation="code"> / </TextStyle> (a forward
      slash).
    </p>
  );
}

export default withPolarisExample(TextStyleExample);
