import { AppProvider, Card } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Card title="Customer">
  <Card.Section>
    <p>John Smith</p>
  </Card.Section>
  <Card.Section title="Addresses">
    <Card.Subsection>
      123 First St
      <br />
      Somewhere
      <br />
      The Universe
    </Card.Subsection>
    <Card.Subsection>
      123 Second St
      <br />
      Somewhere
      <br />
      The Universe
    </Card.Subsection>
  </Card.Section>
  <Card.Section>
    <Card.Subsection>
      A single subsection without a sibling has no visual appearance
    </Card.Subsection>
  </Card.Section>
</Card>
    </AppProvider>
  );
}

export default Example;
    