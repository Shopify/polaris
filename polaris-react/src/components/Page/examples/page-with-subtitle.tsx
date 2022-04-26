import { AppProvider, Page, Card } from "@shopify/polaris";
import { ArrowDownMinor } from "@shopify/polaris-icons";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Page
  breadcrumbs={[{content: 'Products', url: '/products'}]}
  title="Invoice"
  subtitle="Statement period: May 3, 2019 to June 2, 2019"
  secondaryActions={[{content: 'Download', icon: ArrowDownMinor}]}
>
  <Card title="Credit card" sectioned>
    <p>Credit card information</p>
  </Card>
</Page>
    </AppProvider>
  );
}

export default Example;
    