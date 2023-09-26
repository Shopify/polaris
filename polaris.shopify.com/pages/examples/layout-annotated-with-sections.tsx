import {
  Page,
  Layout,
  LegacyCard,
  FormLayout,
  TextField,
  TextContainer,
  Text,
} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LayoutExample() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section variant="oneThird">
          <div style={{marginTop: 'var(--p-space-500)'}}>
            <TextContainer>
              <Text id="storeDetails" variant="headingMd" as="h2">
                Store details
              </Text>
              <Text tone="subdued" as="p">
                Shopify and your customers will use this information to contact
                you.
              </Text>
            </TextContainer>
          </div>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard sectioned>
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
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default withPolarisExample(LayoutExample);
