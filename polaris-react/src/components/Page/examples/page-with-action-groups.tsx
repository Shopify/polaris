import { AppProvider, Page, Card } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Page
  title="Products"
  actionGroups={[
    {
      title: 'Promote',
      actions: [
        {
          content: 'Share on Facebook',
          onAction: () => {},
        },
      ],
    },
  ]}
>
  <Card title="Credit card" sectioned>
    <p>Credit card information</p>
  </Card>
</Page>
    </AppProvider>
  );
}

export default Example;
    