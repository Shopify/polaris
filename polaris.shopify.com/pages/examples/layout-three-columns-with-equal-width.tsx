import {
  Page,
  Layout,
  LegacyCard,
  ResourceList,
  Thumbnail,
  Text,
} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LayoutExample() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section oneThird>
          <LegacyCard title="Florida" actions={[{content: 'Manage'}]}>
            <LegacyCard.Section>
              <Text variant="bodyMd" color="subdued" as="span">
                455 units available
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="Items">
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={[
                  {
                    id: 343,
                    url: '#',
                    name: 'Black & orange scarf',
                    sku: '9234194023',
                    quantity: '254',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: 258,
                    url: '#',
                    name: 'Tucan scarf',
                    sku: '9234194010',
                    quantity: '201',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, sku, media, quantity} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={`View details for ${name}`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section oneThird>
          <LegacyCard title="Nevada" actions={[{content: 'Manage'}]}>
            <LegacyCard.Section>
              <Text variant="bodyMd" color="subdued" as="span">
                301 units available
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="Items">
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={[
                  {
                    id: 344,
                    url: '#',
                    name: 'Black & orange scarf',
                    sku: '9234194023',
                    quantity: '100',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: 259,
                    url: '#',
                    name: 'Tucan scarf',
                    sku: '9234194010',
                    quantity: '201',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, sku, media, quantity} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={`View details for ${name}`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section oneThird>
          <LegacyCard title="Minneapolis" actions={[{content: 'Manage'}]}>
            <LegacyCard.Section>
              <Text variant="bodyMd" color="subdued" as="span">
                1931 units available
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="Items">
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={[
                  {
                    id: 345,
                    url: '#',
                    name: 'Black & orange scarf',
                    sku: '9234194023',
                    quantity: '1230',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: 260,
                    url: '#',
                    name: 'Tucan scarf',
                    sku: '9234194010',
                    quantity: '701',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, sku, media, quantity} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={`View details for ${name}`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default withPolarisExample(LayoutExample);
