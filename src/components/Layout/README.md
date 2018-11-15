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
- Use equal-width layouts with two or more colums when each layout section has the same importance

---

## Content guidelines

The content from the layout component comes from cards and annotated sections.

### Heading

Headings should be:

- Informative and descriptive
  - They should label the type of content grouped in the card
- Concise and scannable:
  - Use simple, clear language that can be read at a glance
  - Keep to a single sentence and avoid using punctuation such as periods, commas, or semicolons
  - Avoid articles (the, a, an) in [microcopy headings](/content/grammar-and-mechanics#headings-and-subheadings) to keep content short and actionable
  - Write in sentence case (first word capitalized, the rest is lowercase)

<!-- usagelist -->

#### Do

- Online store dashboard

#### Don’t

- This is your online store dashboard

<!-- end -->

### Body content

Body content should be:

- Actionable: start sentences with imperative verbs when telling merchants what actions are available to them (especially something new). Don’t use permissive language like “you can”.

<!-- usagelist -->

#### Do

- Get performance for all your sales channels.

#### Don’t

- Now you can get performance data for all your sales channels.

<!-- end -->

- Structured for merchant success: always put the most critical information first.
- Clear: use the verb “need” to help merchants understand when they’re required to do something.

<!-- usagelist -->

#### Do

- To buy a shipping label, you need to enter the total weight of your shipment, including packaging.

#### Don’t

- To buy a shipping label, you must enter the total weight of your shipment, including packaging.

<!-- end -->

### Call-to-action button

Buttons should be:

- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by mislabeling a button.

<!-- usagelist -->

#### Do

- Buy shipping label

#### Don’t

- Buy

<!-- end -->

- Action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->

#### Do

- Activate Apple Pay

#### Don’t

- Try Apple Pay

<!-- end -->

- Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->

#### Do

- Add menu item

#### Don’t

- Add a menu item

<!-- end -->

### Section titles

Section titles should be:

- Informative: they should label the type of content grouped in the body content below
- Like headings: follow the same content guidelines as when you’re writing headings

### Action links

Links should be:

- Used for secondary or persistent actions: links are for lower priority actions than buttons, or persistent actions that merchants may take at any time (e.g. a persistent Edit link).
- Clearly labeled: merchants should not need to guess where they’ll end up if they click on an action link. Never use “click here” as a link because it doesn’t set expectations about what’s next.
- Similar to buttons: follow the same content guidelines as when you’re writing buttons.

### Annotated content titles

Annotated content titles should be:

- Informative: they should label the type of content grouped in the body content below
- Like headings: follow the same content guidelines as when you’re writing headings

### Annotated content descriptions

The descriptions in annotated sections should:

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

Use to follow a normal section with a secondary section to create a 2/3 + 1/3 layout on detail pages (e.g. individual product or order pages). Can also be used on any page that needs to structure a lot of content. This layout will stack the columns on small screens.

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
  <Layout.Section secondary>
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
  <Layout.Section secondary>
    <Card title="Nevada" actions={[{content: 'Manage'}]}>
      <Card.Section>
        <TextStyle variation="subdued">301 units available</TextStyle>
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
              quantity: '100',
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
</Layout>
```

### Three columns with equal width

Use to create a ⅓ + ⅓ + ⅓ layout. Can be used to display content of equal importance. This layout will stack the columns on small screens.

```jsx
<Layout>
  <Layout.Section secondary>
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
  <Layout.Section secondary>
    <Card title="Nevada" actions={[{content: 'Manage'}]}>
      <Card.Section>
        <TextStyle variation="subdued">301 units available</TextStyle>
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
              quantity: '100',
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
  <Layout.Section secondary>
    <Card title="Minneapolis" actions={[{content: 'Manage'}]}>
      <Card.Section>
        <TextStyle variation="subdued">1931 units available</TextStyle>
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
              quantity: '1230',
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

---

## Related components

- To visually group content in a layout section, [use the card component](/components/structure/card)
- To lay out a set of smaller components in a row, [use the stack component](/components/structure/stack)
- To lay out form fields, [use the form layout component](/components/forms/form-layout)
