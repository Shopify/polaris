import { AppProvider, Card } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Card title="Online store dashboard">
  <Card.Section>
    <p>View a summary of your online store’s performance.</p>
  </Card.Section>

  <Card.Section>
    <p>
      View a summary of your online store’s performance, including sales,
      visitors, top products, and referrals.
    </p>
  </Card.Section>
</Card>
    </AppProvider>
  );
}

export default Example;
    