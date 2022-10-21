import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  AlphaStack,
  Banner,
  Box,
  Card,
  Columns,
  FormLayout,
  Layout,
  Page,
  ResourceList,
  Text,
  TextField,
  TextStyle,
  Thumbnail,
} from '@shopify/polaris';

export default {
  component: Layout,
} as ComponentMeta<typeof Layout>;

export function OneColumn() {
  return (
    <Page fullWidth>
      <Columns columns={{xs: 1}}>
        <Card title="Online store dashboard" sectioned>
          <p>View a summary of your online store’s performance.</p>
        </Card>
      </Columns>
    </Page>
  );
}

export function TwoColumnsWithPrimaryAndSecondaryWidths() {
  return (
    <Page fullWidth>
      <Columns columns={{xs: 1, lg: '2fr 1fr'}}>
        <Card title="Order details" sectioned>
          <p>
            Use to follow a normal section with a secondary section to create a
            2/3 + 1/3 layout on detail pages (such as individual product or
            order pages). Can also be used on any page that needs to structure a
            lot of content. This layout stacks the columns on small screens.
          </p>
        </Card>
        <div>
          <Card title="Tags" sectioned>
            <p>Add tags to your order.</p>
          </Card>
        </div>
      </Columns>
    </Page>
  );
}

export function TwoColumnsWithEqualWidth() {
  return (
    <Page fullWidth>
      <Columns columns={{xs: 1, lg: 2}}>
        <Card title="Florida" actions={[{content: 'Manage'}]}>
          <Card.Section>
            <TextStyle variation="subdued">455 units available</TextStyle>
          </Card.Section>
          <Card.Section title="Items">
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
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                    <div>SKU: {sku}</div>
                    <div>{quantity} available</div>
                  </ResourceList.Item>
                );
              }}
            />
          </Card.Section>
        </Card>
        <div>
          <Card title="Nevada" actions={[{content: 'Manage'}]}>
            <Card.Section>
              <TextStyle variation="subdued">455 units available</TextStyle>
            </Card.Section>
            <Card.Section title="Items">
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
                        <TextStyle variation="strong">{name}</TextStyle>
                      </h3>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card.Section>
          </Card>
        </div>
      </Columns>
    </Page>
  );
}

export function ThreeColumnsWithEqualWidth() {
  return (
    <Page fullWidth>
      <Columns columns={{xs: 3}}>
        <Card title="Florida" actions={[{content: 'Manage'}]}>
          <Card.Section>
            <TextStyle variation="subdued">455 units available</TextStyle>
          </Card.Section>
          <Card.Section title="Items">
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
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                    <div>SKU: {sku}</div>
                    <div>{quantity} available</div>
                  </ResourceList.Item>
                );
              }}
            />
          </Card.Section>
        </Card>
        <div>
          {' '}
          <Card title="Nevada" actions={[{content: 'Manage'}]}>
            <Card.Section>
              <TextStyle variation="subdued">301 units available</TextStyle>
            </Card.Section>
            <Card.Section title="Items">
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
                        <TextStyle variation="strong">{name}</TextStyle>
                      </h3>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card.Section>
          </Card>
        </div>
        <div>
          {' '}
          <Card title="Minneapolis" actions={[{content: 'Manage'}]}>
            <Card.Section>
              <TextStyle variation="subdued">1931 units available</TextStyle>
            </Card.Section>
            <Card.Section title="Items">
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
                        <TextStyle variation="strong">{name}</TextStyle>
                      </h3>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card.Section>
          </Card>
        </div>
      </Columns>
    </Page>
  );
}

export function Annotated() {
  return (
    <Page fullWidth>
      <Columns columns={{xs: 1, lg: '1fr 2fr'}}>
        <Box paddingTop="5">
          <AlphaStack>
            <Text variant="headingMd" as="h2">
              Store details
            </Text>
            <Text variant="bodyMd" as="p" color="subdued">
              Shopify and your customers will use this information to contact
              you.
            </Text>
          </AlphaStack>
        </Box>
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
      </Columns>
    </Page>
  );
}

export function AnnotatedWithBannerAtTheTop() {
  return (
    <Page fullWidth>
      <AlphaStack fullWidth>
        <Box paddingBottom="4" borderBottom="divider">
          <Banner title="Order archived" onDismiss={() => {}}>
            <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
          </Banner>
        </Box>
        <Columns columns={{xs: 1, lg: '1fr 2fr'}}>
          <Box paddingTop="5">
            <AlphaStack>
              <Text variant="headingMd" as="h2">
                Store details
              </Text>
              <Text variant="bodyMd" as="p" color="subdued">
                Shopify and your customers will use this information to contact
                you.
              </Text>
            </AlphaStack>
          </Box>
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
        </Columns>
      </AlphaStack>
    </Page>
  );
}
