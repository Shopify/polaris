import { AppProvider, Page, Card, Stack, Button } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";

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
          breadcrumbs={[{ content: "Orders", url: "/orders" }]}
          title="#1085"
          secondaryActions={[
            { content: "Print" },
            { content: "Unarchive" },
            { content: "Cancel order" },
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
      </div>
    </AppProvider>
  );
}

export default Example;
