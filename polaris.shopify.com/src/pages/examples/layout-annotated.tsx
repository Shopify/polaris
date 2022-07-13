import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Heading,
  TextContainer,
  TextStyle,
} from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function LayoutExample() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section oneThird>
          <div style={{ marginTop: "var(--p-space-5)" }}>
            <TextContainer>
              <Heading id="storeDetails">Store details</Heading>
              <div>
                <TextStyle variation="subdued">
                  Shopify and your customers will use this information to
                  contact you.
                </TextStyle>
              </div>
            </TextContainer>
          </div>
        </Layout.Section>
        <Layout.Section twoThirds>
          <Card sectioned>
            <FormLayout>
              <TextField
                label="Store name"
                onChange={() => {}}
                autoComplete="off"
              />
              <TextField
                type="email"
                label="Account email"
                onChange={() => {}}
                autoComplete="email"
              />
            </FormLayout>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default withPolarisExample(LayoutExample);
