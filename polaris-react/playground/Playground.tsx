import React from 'react';

import {BlockStack, Card, Layout, Page, Picker, Text} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      {/* Add the code you want to test in here */}
      <Layout>
        <Layout.Section>
          <h1>Playground</h1>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <Text as="h3">Organization</Text>
              <Picker
                activator={{label: 'Product', placeholder: 'Select a product'}}
                options={[
                  {
                    value: 'option1',
                    accessibilityLabel: 'option1',
                    children: 'option1',
                  },
                  {
                    value: 'option2',
                    accessibilityLabel: 'option2',
                    children: 'option2',
                  },
                  {
                    value: 'option3',
                    accessibilityLabel: 'option3',
                    children: 'option3',
                  },
                  {
                    value: 'option4',
                    accessibilityLabel: 'option4',
                    children: 'option4',
                  },
                ]}
              />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
