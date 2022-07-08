import { Card, Image, TextContainer } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function CardExample() {
  return (
    <Card>
      <Card.Section flush>
        <Image
          source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
          alt="a sheet with purple and orange stripes"
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
