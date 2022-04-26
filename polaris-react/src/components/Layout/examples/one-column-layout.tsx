import { AppProvider, Page, Layout, Card } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Page fullWidth>
  <Layout>
    <Layout.Section>
      <Card title="Online store dashboard" sectioned>
        <p>View a summary of your online store’s performance.</p>
      </Card>
    </Layout.Section>
  </Layout>
</Page>
    </AppProvider>
  );
}

export default Example;
    