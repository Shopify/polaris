import React from 'react';
import {PlusCircleIcon} from '@shopify/polaris-icons';

import {BlockStack, Card, Layout, Page, Picker, Text} from '../src';

export function Playground() {
  const [selected, setSelected] = React.useState('');
  const options = [
    {
      value: '012345678',
      children: 'Burberry',
    },
    {
      value: '123456789',
      children: 'Chanel',
    },
    {
      value: '234567890',
      children: 'Dior',
    },
    {
      value: '345678901',
      children: 'Gucci',
    },
    {
      value: '456789012',
      children: 'Hermès',
    },
    {
      value: '567890123',
      children: 'Louis Vuitton',
    },
    {
      value: '678901234',
      children: <span>Prada</span>,
    },
    {
      value: '789012345',
      children: <div>Versace</div>,
    },
  ];

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
                searchField={{
                  label: 'Search for a product',
                  placeholder: 'Search for a product',
                  autoComplete: 'off',
                  onChange: (value) => console.log(value),
                }}
                activator={{
                  label: 'Product',
                  placeholder: 'Select a product',
                }}
                options={options}
                onSelect={setSelected}
                addAction={{
                  value: 'addy',
                  children: 'Add product',
                  icon: PlusCircleIcon,
                }}
              />
              <ul>
                <li>Selected: {selected}</li>
              </ul>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
