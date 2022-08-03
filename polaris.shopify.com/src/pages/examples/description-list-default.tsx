import { DescriptionList } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function Example() {
  return (
    <DescriptionList
      items={[
        {
          term: "Logistics",
          description:
            "The management of products or other resources as they travel between a point of origin and a destination.",
        },
        {
          term: "Sole proprietorship",
          description:
            "A business structure where a single individual both owns and runs the company.",
        },
        {
          term: "Discount code",
          description:
            "A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.",
        },
      ]}
    />
  );
}

export default withPolarisExample(Example);
