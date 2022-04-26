import { AppProvider, Page,Card } from "@shopify/polaris";

import translations from '@shopify/polaris/locales/en.json';

function Example() {
  return (
    <AppProvider i18n={translations}>
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
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
      </div>
    </AppProvider>
  );
}

export default Example;
