import { Card } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function CardExample() {
  return (
    <Card title="Online store dashboard" sectioned>
      <p>View a summary of your online store’s performance.</p>
    </Card>
  );
}

export default withPolarisExample(CardExample);
