---
name: Card
category: Structure
platforms:
  - android
  - ios
  - web
keywords:
  - layout
  - container
  - box
  - grid
  - panel
  - card with call to action in the footer
  - card with call to action in the heading
  - card with button in the footer
  - card with button in the heading
  - card with multiple sections
  - sectioned card
  - card with a subdued section
  - subdued card for secondary content
  - callout
  - call out
---

# Card

Cards are used to group similar concepts and tasks together to make Shopify
easier for merchants to scan, read, and get things done.

---

## Best practices

Cards should:

- Use headings that set clear expectations about the card’s purpose
- Prioritize information so the content merchants most need to know comes
  first
- Stick to single user flows or break more complicated flows into multiple
  sections
- Avoid too many call-to-action buttons or links and only one primary call to
  action per card
- Use calls to action on the bottom of the card for next steps and use the
  space in the upper right corner of the card for persistent, optional actions
  (e.g. an Edit link)

---

## Content guidelines

### Heading

Headings should be:

- Descriptive: Help merchants understand what they’ll find in the card
- Concise and scannable:
  - Use simple, clear language that can be read at a glance
  - Keep headings to single sentence and avoid using punctuation such as
    periods, commas, or semicolons
  - Where possible, avoid articles (the, a, an) to keep content short and
    actionable
  - Written in sentence case
  - Informative: They should label the type of content grouped in the body
    content below

<!-- usagelist -->

#### Do

Online store dashboard

#### Don’t

This is your online store dashboard

<!-- end -->

### Body content

Body content should be:

- Actionable: start sentences with imperative verbs when telling merchants what
  actions are available to them (especially something new). Don’t use permissive
  language like “you can”.

<!-- usagelist -->

#### Do

Get performance for all your sales channels.

#### Don’t

Now you can get performance data for all your sales channels.

<!-- end -->

- Structured for merchant success: always put the most critical information
  first.
- Clear: use the verb “need” to help merchants understand when they’re required
  to do something.

<!-- usagelist -->

#### Do

To buy a shipping label, you need to enter the total weight of your shipment,
including packaging.

#### Don’t

To buy a shipping label, you must enter the total weight of your shipment,
including packaging.

<!-- end -->

### Call-to-action button

Buttons should be:

- Clear and predictable: merchants should be able to anticipate what will happen
  when they click a button. Never deceive merchants by mislabeling a button.

<!-- usagelist -->

#### Do

- Create order
- Buy shipping label

#### Don’t

- New order
- Buy

<!-- end -->

Action-led: buttons should always lead with a strong verb that encourages
action. To provide enough context to merchants use the {verb}+{noun} format on
buttons except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->

#### Do

- Activate Apple Pay
- View shipping settings

#### Don’t

- Try Apple Pay
- View your settings

<!-- end -->

Scannable: Avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->

#### Do

Add menu item

#### Don’t

Add a menu item

<!-- end -->

### Section titles

Section titles should be:

- Informative: they should label the type of content grouped in the body
  content below
- Like headings: follow the same content guidelines as when you’re writing
  headings

### Action links

Links should be:

- Used for secondary or persistent actions: links should be used to represent
  lower priority actions than buttons, or persistent actions that merchants may
  take at any time (e.g. a persistent Edit link).
- Clearly labeled: merchants should not need to guess where they’ll end up if
  they click on an action link. Never use “click here” as a link because it
  doesn’t set expectations about what’s next.
- Similar to buttons: Follow the same content guidelines as when you’re writing
  text for buttons.

---

## Examples

### Default card

Use when you have a simple message to communicate to merchants that doesn’t require any secondary steps.

```jsx
<Card title="Online store dashboard" sectioned>
  <p>View a summary of your online store’s performance.</p>
</Card>
```

<!-- content-for: android -->

![Default card with a title and a short body](/public_images/components/Card/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Default card with a title and a short body](/public_images/components/Card/ios/default@2x.png)

<!-- /content-for -->

### Card with header actions

<!-- content-for: web -->

Use for less important card actions, or actions merchants may do before reviewing the contents of the card. For example, merchants may want to add items to a card containing a long list, or enter a customer’s new address.

<!-- /content-for -->

```jsx
<Card sectioned title="Variants" actions={[{content: 'Add variant'}]}>
  <p>
    Add variants if this product comes in multiple versions, like different
    sizes or colors.
  </p>
</Card>
```

<!-- content-for: ios, android -->

Use for less important card actions, or actions merchants may do before reviewing the contents of the card.

- Use an icon for the action, if possible
- Include no more than 2 actions

<!-- /content-for -->

<!-- content-for: android -->

![Card with a title (Conditions), a short body and a header action to add a condition](/public_images/components/Card/android/header-actions@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Card with a title (Conditions), a short body and a header action to add a condition](/public_images/components/Card/ios/header-actions@2x.png)

<!-- /content-for -->

### Card with footer actions

<!-- content-for: web -->

Use footer actions for a card’s most important actions, or actions merchants should do after reviewing the contents of the card. For example, merchants should review the contents of a shipment before important actions like canceling or adding tracking information.

<!-- /content-for -->

```jsx
<Card
  title="Shipment 1234"
  secondaryFooterAction={{content: 'Cancel shipment'}}
  primaryFooterAction={{content: 'Add tracking number'}}
>
  <Card.Section title="Items">
    <List>
      <List.Item>1 × Isis Glass, 4-Pack</List.Item>
      <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
    </List>
  </Card.Section>
</Card>
```

<!-- content-for: android, ios -->

Use footer actions for a card’s most important actions, or actions merchants should do after reviewing the contents of the card.

- Use buttons with labels
- If you have more than 2 actions, consider using an overflow menu on the card

<!-- /content-for -->

<!-- content-for: android -->

![Card featuring footer actions: add variant, edit options](/public_images/components/Card/android/footer-actions@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Card featuring footer actions: add variant, edit options](/public_images/components/Card/ios/footer-actions@2x.png)

<!-- /content-for -->

### Card with multiple sections

Use when you have two related but distinct pieces of information to communicate to merchants. Multiple sections can help break up complicated concepts to make them easier to scan and understand.

```jsx
<Card title="Online store dashboard">
  <Card.Section>
    <p>View a summary of your online store’s performance.</p>
  </Card.Section>

  <Card.Section>
    <p>
      View a summary of your online store’s performance, including sales,
      visitors, top products, and referrals.
    </p>
  </Card.Section>
</Card>
```

<!-- content-for: android -->

![Shipping costs card with multiple sections: domestic, international](/public_images/components/Card/android/multiple-sections@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Shipping costs card with multiple sections: domestic, international](/public_images/components/Card/ios/multiple-sections@2x.png)

<!-- /content-for -->

### Card with multiple titled sections

Use when you have two related but distinct pieces of information to communicate to merchants that are complex enough to require a title to introduce them.

```jsx
<Card title="Online store dashboard">
  <Card.Section title="Reports">
    <p>View a summary of your online store’s performance.</p>
  </Card.Section>

  <Card.Section title="Summary">
    <p>
      View a summary of your online store’s performance, including sales,
      visitors, top products, and referrals.
    </p>
  </Card.Section>
</Card>
```

<!-- content-for: android -->

![Customer card with multiple titled sections: note, shipping address](/public_images/components/Card/android/multiple-titled-sections@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Customer card with multiple titled sections: note, shipping address](/public_images/components/Card/ios/multiple-titled-sections@2x.png)

<!-- /content-for -->

### Card with a subdued section

<!-- example-for: web -->

Use to indicate when one of the sections in your card contains inactive or disabled content.

```jsx
<Card title="Staff accounts">
  <Card.Section>
    <List>
      <List.Item>Felix Crafford</List.Item>
      <List.Item>Ezequiel Manno</List.Item>
    </List>
  </Card.Section>

  <Card.Section subdued title="Deactivated staff accounts">
    <List>
      <List.Item>Felix Crafford</List.Item>
      <List.Item>Ezequiel Manno</List.Item>
    </List>
  </Card.Section>
</Card>
```

### Subdued card for secondary content

<!-- example-for: web -->

Use for content that you want to deprioritize. Subdued cards don’t stand out as much as cards with white backgrounds so don’t use them for information or actions that are critical to merchants.

```jsx
<Card title="Deactivated staff accounts" sectioned subdued>
  <List>
    <List.Item>Felix Crafford</List.Item>
    <List.Item>Ezequiel Manno</List.Item>
  </List>
</Card>
```

### Card with separate header

<!-- example-for: web -->

Use to be able to use custom React elements as header content.

```jsx
<Card>
  <Card.Header
    actions={[
      {
        content: 'Preview',
      },
    ]}
    title="Staff accounts"
  >
    <Popover
      active
      activator={
        <Button disclosure plain>
          Add account
        </Button>
      }
      onClose={() => {}}
    >
      <ActionList items={[{content: 'Member'}, {content: 'Admin'}]} />
    </Popover>
  </Card.Header>
  <Card.Section>
    <List>
      <List.Item>Felix Crafford</List.Item>
      <List.Item>Ezequiel Manno</List.Item>
    </List>
  </Card.Section>
</Card>
```

### Card section with custom React Node title

<!-- example-for: web -->

Use to render custom content such as icons, links, or buttons in a card section's header.

```jsx
<Card title="Products">
  <Card.Section
    title={
      <Stack>
        <Icon source="products" />
        <Subheading>New Products</Subheading>
      </Stack>
    }
  >
    <List>
      <List.Item>Socks</List.Item>
      <List.Item>Super Shoes</List.Item>
    </List>
  </Card.Section>
</Card>
```

---

## Related components

- To create page-level layout, [use the layout component](/components/structure/layout)
- To highlight a Shopify feature, [use the callout card component](/components/structure/callout-card)
