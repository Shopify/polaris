import { AppProvider, Card, TextContainer, Banner, Link } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Card title="Online store dashboard" sectioned>
  <TextContainer>
    <Banner onDismiss={() => {}}>
      <p>
        Use your finance report to get detailed information about your business.{' '}
        <Link url="">Let us know what you think</Link>
      </p>
    </Banner>

    <p>View a summary of your online store’s performance.</p>
  </TextContainer>
</Card>
    </AppProvider>
  );
}

export default Example;
    