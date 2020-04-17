---
name: Layout
category: Structure
keywords:
  - one column
  - two column
  - three column
  - column
  - annotated
  - page
  - column layouts
  - containers
  - full width containers
  - secondary sections
  - setting page
  - grouped sections
  - annotated sections
---

# Layout

The layout component is used to create the main layout on a page. Layouts sections come in three main configurations: one-column, two-column, and annotated. One and two column layouts can be combined in the same page. Annotated layouts should be used on their own and only on settings pages.

---

## Best practices

The layout component should:

- Use sections with white backgrounds for primary content and sections with grey backgrounds for secondary content that is less important
- Center cards on the background when there is no secondary card on the page to stop the content from becoming too wide
- Group similar concepts and actions together in cards
- Separate different cards using a full-width divider
- Structure primary/secondary, two-column layouts so the primary ⅔ section is used for main information and the secondary ⅓ section is used for information that might not be used as often but remains helpful for context or secondary tasks
- Use equal-width layouts with two or more columns when each layout section has the same importance

---

## Content guidelines

The content that appears in the layout component comes from cards and annotated sections.

### Cards

Content from cards should follow the content guidelines for [cards](https://polaris.shopify.com/components/structure/card#section-content-guidelines).

### Annotated section titles

Annotated section titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings).

### Annotated section descriptions

Annotated section descriptions should:

- Be used if the explanation or purpose of the associated cards isn’t clear
- Provide instructions for any choices merchants need to make, or explain the purpose of the section
- Be short, no more than 1–3 sentences
- Direct merchants to more content in the Help Center with “Learn more” links
- Not repeat the section title
- Use complete sentences and regular punctuation

---

## Examples

### One-column layout

Use to have a single section on its own in a full-width container. Use for simple pages and as a container for banners and other full-width content.

```jsx
<Layout>
  <Layout.Section>
    <Card title="Online store dashboard" sectioned>
      <p>View a summary of your online store’s performance.</p>
    </Card>
  </Layout.Section>
</Layout>
```

### Two columns with primary and secondary widths

Use to follow a normal section with a secondary section to create a 2/3 + 1/3 layout on detail pages (such as individual product or order pages). Can also be used on any page that needs to structure a lot of content. This layout stacks the columns on small screens.

```jsx
<Layout>
  <Layout.Section>
    <Card title="Order details" sectioned>
      <p>View a summary of your order.</p>
    </Card>
  </Layout.Section>
  <Layout.Section secondary>
    <Card title="Tags" sectioned>
      <p>Add tags to your order.</p>
    </Card>
  </Layout.Section>
</Layout>
```

### Two columns with equal width

Use to create a ½ + ½ layout. Can be used to display content of equal importance. This layout will stack the columns on small screens.

```jsx
<Layout>
  <Layout.Section oneHalf>
    <Card title="Florida" actions={[{content: 'Manage'}]}>
      <Card.Section>
        <TextStyle variation="subdued">455 units available</TextStyle>
      </Card.Section>
      <Card.Section title="Items">
        <ResourceList
          resourceName={{singular: 'product', plural: 'products'}}
          items={[
            {
              id: 341,
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
              id: 256,
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
  </Layout.Section>
  <Layout.Section oneHalf>
    <Card title="Nevada" actions={[{content: 'Manage'}]}>
      <Card.Section>
        <TextStyle variation="subdued">301 units available</TextStyle>
      </Card.Section>
      <Card.Section title="Items">
        <ResourceList
          resourceName={{singular: 'product', plural: 'products'}}
          items={[
            {
              id: 342,
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
              id: 257,
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
  </Layout.Section>
</Layout>
```

### Three columns with equal width

Use to create a ⅓ + ⅓ + ⅓ layout. Can be used to display content of equal importance. This layout will stack the columns on small screens.

```jsx
<Layout>
  <Layout.Section oneThird>
    <Card title="Florida" actions={[{content: 'Manage'}]}>
      <Card.Section>
        <TextStyle variation="subdued">455 units available</TextStyle>
      </Card.Section>
      <Card.Section title="Items">
        <ResourceList
          resourceName={{singular: 'product', plural: 'products'}}
          items={[
            {
              id: 343,
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
              id: 258,
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
  </Layout.Section>
  <Layout.Section oneThird>
    <Card title="Nevada" actions={[{content: 'Manage'}]}>
      <Card.Section>
        <TextStyle variation="subdued">301 units available</TextStyle>
      </Card.Section>
      <Card.Section title="Items">
        <ResourceList
          resourceName={{singular: 'product', plural: 'products'}}
          items={[
            {
              id: 344,
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
              id: 259,
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
  </Layout.Section>
  <Layout.Section oneThird>
    <Card title="Minneapolis" actions={[{content: 'Manage'}]}>
      <Card.Section>
        <TextStyle variation="subdued">1931 units available</TextStyle>
      </Card.Section>
      <Card.Section title="Items">
        <ResourceList
          resourceName={{singular: 'product', plural: 'products'}}
          items={[
            {
              id: 345,
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
              id: 260,
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
  </Layout.Section>
</Layout>
```

### Annotated layout

Use for settings pages. When settings are grouped thematically in annotated sections, the title and description on each section helps merchants quickly find the setting they’re looking for.

```jsx
<Layout>
  <Layout.AnnotatedSection
    title="Store details"
    description="Shopify and your customers will use this information to contact you."
  >
    <Card sectioned>
      <FormLayout>
        <TextField label="Store name" onChange={() => {}} />
        <TextField type="email" label="Account email" onChange={() => {}} />
      </FormLayout>
    </Card>
  </Layout.AnnotatedSection>
</Layout>
```

### Annotated layout with Banner at the top

Use for settings pages that need a banner or other content at the top.

```jsx
<Layout>
  <Layout.Section>
    <Banner title="Order archived" onDismiss={() => {}}>
      <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
    </Banner>
  </Layout.Section>
  <Layout.AnnotatedSection
    title="Store details"
    description="Shopify and your customers will use this information to contact you."
  >
    <Card sectioned>
      <FormLayout>
        <TextField label="Store name" onChange={() => {}} />
        <TextField type="email" label="Account email" onChange={() => {}} />
      </FormLayout>
    </Card>
  </Layout.AnnotatedSection>
</Layout>
```

---

## Related components

- To visually group content in a layout section, [use the card component](https://polaris.shopify.com/components/structure/card)
- To lay out a set of smaller components in a row, [use the stack component](https://polaris.shopify.com/components/structure/stack)
- To lay out form fields, [use the form layout component](https://polaris.shopify.com/components/forms/form-layout)
