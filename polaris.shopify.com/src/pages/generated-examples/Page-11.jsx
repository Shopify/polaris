import { AppProvider, Page,Card } from "@shopify/polaris";
import translations from '@shopify/polaris/locales/en.json';

function Example() {
  return (
    <AppProvider i18n={translations}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@shopify/polaris@latest/build/esm/styles.css"
      />
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
      title: 'Copy',
      onClick: (openActions) => {
        alert('Copy action');
        openActions();
      },
      actions: [{content: 'Copy to clipboard'}],
    },
    {
      title: 'Promote',
      disabled: true,
      actions: [{content: 'Share on Facebook'}],
    },
    {
      title: 'More actions',
      actions: [
        {content: 'Duplicate'},
        {content: 'Print'},
        {content: 'Unarchive'},
        {content: 'Cancel order'},
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
    