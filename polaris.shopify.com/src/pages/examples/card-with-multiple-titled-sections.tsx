import { Card } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function CardExample() {
  return (
    <Card title="Online store dashboard">
      <Card.Section title="Reports">
        <p>View a summary of your online store’s performance.</p>
      </Card.Section>

      <Card.Section title="Summary">
        <p>
          View a summary of your online store’s performance, including sales,
          visitors, top products, and referrals.
        </p>
      </Card.Section>
    </Card>
  );
}

export default withPolarisExample(CardExample);
