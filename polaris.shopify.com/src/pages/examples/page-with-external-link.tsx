import { Page, Card } from "@shopify/polaris";
import { ExternalMinor } from "@shopify/polaris-icons";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function PageExample() {
  return (
    <Page
      title="Jar With Lock-Lid"
      primaryAction={{ content: "Save", disabled: true }}
      secondaryActions={[
        {
          content: "Promote",
          external: true,
          icon: ExternalMinor,
          url: "https://www.facebook.com/business/learn/facebook-page-build-audience",
        },
      ]}
    >
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
    </Page>
  );
}

export default withPolarisExample(PageExample);
