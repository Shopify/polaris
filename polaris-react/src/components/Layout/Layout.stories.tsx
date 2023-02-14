import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Banner,
  LegacyCard,
  FormLayout,
  Text,
  Layout,
  Page,
  ResourceList,
  TextContainer,
  TextField,
  Thumbnail,
} from '@shopify/polaris';

export default {
  component: Layout,
} as ComponentMeta<typeof Layout>;

export function OneColumn() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Online store dashboard" sectioned>
            <p>View a summary of your online store’s performance.</p>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export function TwoColumnsWithPrimaryAndSecondaryWidths() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Order details" sectioned>
            <p>
              Use to follow a normal section with a secondary section to create
              a 2/3 + 1/3 layout on detail pages (such as individual product or
              order pages). Can also be used on any page that needs to structure
              a lot of content. This layout stacks the columns on small screens.
            </p>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section secondary>
          <LegacyCard title="Tags" sectioned>
            <p>Add tags to your order.</p>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export function TwoColumnsWithEqualWidth() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section oneHalf>
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
                    id: '341',
                    url: 'produdcts/341',
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
                    id: '256',
                    url: 'produdcts/256',
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
                      <h3>
                        <Text variant="bodyMd" fontWeight="bold" as="span">
                          {name}
                        </Text>
                      </h3>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section oneHalf>
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
                    id: '342',
                    url: 'produdcts/342',
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
                    id: '257',
                    url: 'produdcts/257',
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
                      <h3>
                        <Text variant="bodyMd" fontWeight="bold" as="span">
                          {name}
                        </Text>
                      </h3>
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

export function ThreeColumnsWithEqualWidth() {
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
                    id: '343',
                    url: 'produdcts/343',
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
                    id: '258',
                    url: 'produdcts/258',
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
                      <h3>
                        <Text variant="bodyMd" fontWeight="bold" as="span">
                          {name}
                        </Text>
                      </h3>
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
                    id: '344',
                    url: 'produdcts/344',
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
                    id: '259',
                    url: 'produdcts/259',
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
                      <h3>
                        <Text variant="bodyMd" fontWeight="bold" as="span">
                          {name}
                        </Text>
                      </h3>
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
                    id: '345',
                    url: 'produdcts/345',
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
                    id: '260',
                    url: 'produdcts/260',
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
                      <h3>
                        <Text variant="bodyMd" fontWeight="bold" as="span">
                          {name}
                        </Text>
                      </h3>
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

export function Annotated() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Store details"
          description="Shopify and your customers will use this information to contact you."
        >
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
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}

export function AnnotatedWithBannerAtTheTop() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Banner title="Order archived" onDismiss={() => {}}>
            <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
          </Banner>
        </Layout.Section>
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Store details"
          description="Shopify and your customers will use this information to contact you."
        >
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
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}
