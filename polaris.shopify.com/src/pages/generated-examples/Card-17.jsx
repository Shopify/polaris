import { AppProvider, Card,Image,TextContainer } from "@shopify/polaris";

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
        <Card>
  <Card.Section flush>
    <Image
      source="https://polaris.shopify.com/bundles/bc7087219578918d62ac40bf4b4f99ce.png"
      alt="turtle illustration centered with body text and a button"
    />
  </Card.Section>
  <Card.Section subdued>
    <TextContainer>
      You can use sales reports to see information about your customers’ orders
      based on criteria such as sales over time, by channel, or by staff.
    </TextContainer>
  </Card.Section>
</Card>
      </div>
    </AppProvider>
  );
}

export default Example;
