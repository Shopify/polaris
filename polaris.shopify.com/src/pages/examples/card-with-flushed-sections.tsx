import { Card, Image, TextContainer } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function CardExample() {
  return (
    <Card>
      <Card.Section flush>
        <Image
          source="https://polaris.shopify.com/bundles/bc7087219578918d62ac40bf4b4f99ce.png"
          alt="turtle illustration centered with body text and a button"
        />
      </Card.Section>
      <Card.Section subdued>
        <TextContainer>
          You can use sales reports to see information about your customers’
          orders based on criteria such as sales over time, by channel, or by
          staff.
        </TextContainer>
      </Card.Section>
    </Card>
  );
}

export default withPolarisExample(CardExample);
