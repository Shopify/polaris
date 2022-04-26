import { AppProvider, Page, Card, Stack, Button } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Page
  breadcrumbs={[{content: 'Orders', url: '/orders'}]}
  title="#1085"
  secondaryActions={[
    {content: 'Print'},
    {content: 'Unarchive'},
    {content: 'Cancel order'},
  ]}
  pagination={{
    hasPrevious: true,
    hasNext: true,
  }}
>
  <Card sectioned title="Fulfill order">
    <Stack alignment="center">
      <Stack.Item fill>
        <p>Buy postage and ship remaining 2 items</p>
      </Stack.Item>
      <Button primary>Continue</Button>
    </Stack>
  </Card>
</Page>
    </AppProvider>
  );
}

export default Example;
    