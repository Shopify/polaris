import React from "react";
import type { NextPage } from "next";
import {
  AppProvider,
  Page,
  Banner,
  Card,
  Layout,
  Link,
  Thumbnail,
} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";

const Home: NextPage = () => {
  return (
    <AppProvider i18n={en}>
      <Page title="Order #1085">
        <Layout>
          <Layout.Section>
            <Banner
              action={{
                content: "Review risk analysis",
                url: "https://www.shopify.com/",
              }}
              title="High risk of fraud detected"
              status="critical"
            >
              <p>
                Before fulfilling this order or capturing payment, please{" "}
                <Link url="https://www.shopify.com/">
                  review the Risk Analysis
                </Link>{" "}
                and determine if this order is fradulent.
              </p>
            </Banner>
          </Layout.Section>
          <Layout.Section>
            <Card
              title="Order details"
              secondaryFooterActions={[
                { content: "Cancel shipment", destructive: true },
              ]}
              primaryFooterAction={{ content: "Add tracking number" }}
            >
              <Card.Section title="Unfulfilled">
                <Thumbnail
                  source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                  alt="Black choker necklace"
                />
                <p>Black choker</p>
              </Card.Section>
              <Card.Section></Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card>
              <Card.Section title="Customer">
                <p>Loyal Customer</p>
                <p>99 orders</p>
              </Card.Section>
              <Card.Section title="Order Contact">
                <p>customer@email.com</p>
                <p>No phone provided</p>
              </Card.Section>
              <Card.Section title="Shipping Address">
                <p>150 Elgin St</p>
                <p>Ottawa, ON, Canada</p>
                <p>K2P 1L4</p>
              </Card.Section>
              <Card.Section title="Billing Address">
                <p>Same as shipping address.</p>
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
};

export default Home;
