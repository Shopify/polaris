import { AppProvider, SkeletonPage, Layout, Card, SkeletonBodyText } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <SkeletonPage title="Products" primaryAction>
  <Layout>
    <Layout.Section>
      <Card sectioned>
        <SkeletonBodyText />
      </Card>
      <Card sectioned title="Images">
        <SkeletonBodyText />
      </Card>
      <Card sectioned title="Variants">
        <SkeletonBodyText />
      </Card>
    </Layout.Section>
    <Layout.Section secondary>
      <Card title="Sales channels">
        <Card.Section>
          <SkeletonBodyText lines={2} />
        </Card.Section>
        <Card.Section>
          <SkeletonBodyText lines={1} />
        </Card.Section>
      </Card>
      <Card title="Organization" subdued>
        <Card.Section>
          <SkeletonBodyText lines={2} />
        </Card.Section>
        <Card.Section>
          <SkeletonBodyText lines={2} />
        </Card.Section>
      </Card>
    </Layout.Section>
  </Layout>
</SkeletonPage>
    </AppProvider>
  );
}

export default Example;
    