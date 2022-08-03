import { TextContainer, Heading } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function TextContainerExample() {
  return (
    <TextContainer>
      <Heading>Install the Shopify POS App</Heading>
      <p>
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </p>
    </TextContainer>
  );
}

export default withPolarisExample(TextContainerExample);
