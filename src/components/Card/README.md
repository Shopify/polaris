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
  - card with call to action in a section
  - card with button in the footer
  - card with button in the heading
  - card with multiple sections
  - card with subsections
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
  (such as an Edit link)

---

## Content guidelines

### Title

Card titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings).

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
  take at any time (such as a persistent Edit link).
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

Use footer actions for a card’s most important actions, or actions merchants should do after reviewing the contents of the card. For example, merchants should review the contents of a shipment before an important action like adding tracking information. Footer actions can be left or right aligned with the `footerActionAlignment` prop.

<!-- /content-for -->

```jsx
<Card
  title="Shipment 1234"
  secondaryFooterActions={[{content: 'Edit shipment'}]}
  primaryFooterAction={{content: 'Add tracking number'}}
>
  <Card.Section title="Items">
    <List>
      <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
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

### Card with multiple footer actions

<!-- example-for: web -->

When multiple secondary footer actions are provided, they will render in an action list popover activated by a disclosure button. The disclosure button text can be customized with the `secondaryFooterActionsDisclosureText` prop.

```jsx
<Card
  title="Shipment 1234"
  secondaryFooterActions={[
    {content: 'Cancel shipment', destructive: true},
    {content: 'Add another shipment', disabled: true},
  ]}
  primaryFooterAction={{content: 'Add tracking number'}}
>
  <Card.Section title="Items">
    <List>
      <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
      <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
    </List>
  </Card.Section>
</Card>
```

### Card with custom footer actions

<!-- example-for: web -->

Use to present actionable content that is optional or not the primary purpose of the page.

```jsx
<Card title="Secure your account with 2-step authentication">
  <Card.Section>
    <Stack spacing="loose" vertical>
      <p>
        Two-step authentication adds an extra layer of security when logging in
        to your account. A special code will be required each time you log in,
        ensuring only you can access your account.
      </p>
      <Stack distribution="trailing">
        <ButtonGroup>
          <Button>Enable two-step authentication</Button>
          <Button plain>Learn more</Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  </Card.Section>
</Card>
```

### Card with destructive footer action

<!-- example-for: web -->

Use when a card action will delete merchant data or be otherwise difficult to recover from.

```jsx
<Card
  title="Shipment 1234"
  secondaryFooterActions={[{content: 'Cancel shipment', destructive: true}]}
  primaryFooterAction={{content: 'Add tracking number'}}
>
  <Card.Section title="Items">
    <List>
      <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
      <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
    </List>
  </Card.Section>
</Card>
```

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

<!-- example-for: web -->

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

### Card section with action

<!-- example-for: web -->

Use when your card section has actions that apply only to that section.

```jsx
<Card title="Customer">
  <Card.Section>
    <p>John Smith</p>
  </Card.Section>
  <Card.Section title="Contact Information" actions={[{content: 'Edit'}]}>
    <p>john.smith@example.com</p>
  </Card.Section>
</Card>
```

### Card with subsection

<!-- example-for: web -->

Use when your card sections need further categorization.

```jsx
<Card title="Customer">
  <Card.Section>
    <p>John Smith</p>
  </Card.Section>
  <Card.Section title="Addresses">
    <Card.Subsection>
      123 First St
      <br />
      Somewhere
      <br />
      The Universe
    </Card.Subsection>
    <Card.Subsection>
      123 Second St
      <br />
      Somewhere
      <br />
      The Universe
    </Card.Subsection>
  </Card.Section>
  <Card.Section>
    <Card.Subsection>
      A single subsection without a sibling has no visual appearance
    </Card.Subsection>
  </Card.Section>
</Card>
```

### Card section with destructive action

<!-- content-for: web -->

Use when a card action applies only to one section and will delete merchant data or be otherwise difficult to recover from.

<!-- /content-for -->

```jsx
<Card title="Customer">
  <Card.Section>
    <p>John Smith</p>
  </Card.Section>
  <Card.Section
    title="Contact Information"
    actions={[{content: 'Delete', destructive: true}, {content: 'Edit'}]}
  >
    <p>john.smith@example.com</p>
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

Use to render custom content such as icons, links, or buttons in a card section’s header.

```jsx
<Card title="Products">
  <Card.Section
    title={
      <Stack>
        <Icon source={ProductsMajorTwotone} />
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

### Card with all of its elements

<!-- example-for: web -->

Use as a broad example that includes most props available to card.

```jsx
<Card
  secondaryFooterActions={[{content: 'Dismiss'}]}
  primaryFooterAction={{content: 'Export Report'}}
>
  <Card.Header
    actions={[
      {
        content: 'Total Sales',
      },
    ]}
    title="Sales"
  >
    <Popover
      active={false}
      activator={
        <Button disclosure plain>
          View Sales
        </Button>
      }
      onClose={() => {}}
    >
      <ActionList items={[{content: 'Gross Sales'}, {content: 'Net Sales'}]} />
    </Popover>
  </Card.Header>
  <Card.Section>
    <TextContainer>
      You can use sales reports to see information about your customers’ orders
      based on criteria such as sales over time, by channel, or by staff.
    </TextContainer>
  </Card.Section>
  <Card.Section title="Total Sales Breakdown">
    <ResourceList
      resourceName={{singular: 'sale', plural: 'sales'}}
      items={[
        {
          sales: 'Orders',
          amount: 'USD$0.00',
          url: 'reports/orders',
        },
        {
          sales: 'Returns',
          amount: '-USD$250.00',
          url: 'reports/returns',
        },
      ]}
      renderItem={(item) => {
        const {sales, amount, url} = item;
        return (
          <ResourceList.Item
            url={url}
            accessibilityLabel={`View Sales for ${sales}`}
          >
            <Stack>
              <Stack.Item fill>{sales}</Stack.Item>
              <Stack.Item>{amount}</Stack.Item>
            </Stack>
          </ResourceList.Item>
        );
      }}
    />
  </Card.Section>
  <Card.Section title="Deactivated reports" subdued>
    <List>
      <List.Item>Payouts</List.Item>
      <List.Item>Total Sales By Channel</List.Item>
    </List>
  </Card.Section>
  <Card.Section title="Note">
    <TextContainer>
      The sales reports are available only if your store is on the Shopify plan
      or higher.
    </TextContainer>
  </Card.Section>
</Card>
```

---

## Related components

- To create page-level layout, [use the layout component](https://polaris.shopify.com/components/structure/layout)
- To highlight a Shopify feature, [use the callout card component](https://polaris.shopify.com/components/structure/callout-card)

---

## Accessibility

<!-- content-for: android -->

See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility/)

<!-- /content-for -->

<!-- content-for: ios -->

See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

<!-- /content-for -->

<!-- content-for: web -->

The required `title` prop gives the card a level 2 heading (`<h2>`). This helps with readability and provides structure to screen reader users.

If you use the `subdued` prop on a card or section, make sure that the card or section `title` conveys the reason for using `subdued`. This ensures that merchants with low vision, including those who use screen readers, can identify that the content is inactive or less important.

<!-- usageblock -->

#### Do

```
<Card title="Deactivated staff accounts" sectioned subdued>
  <List>
    <List.Item>Felix Crafford</List.Item>
    <List.Item>Ezequiel Manno</List.Item>
  </List>
</Card>
```

#### Don’t

```
<Card title="Staff accounts" sectioned subdued>
  <List>
    <List.Item>Felix Crafford</List.Item>
    <List.Item>Ezequiel Manno</List.Item>
  </List>
</Card>
```

<!-- end -->

<!-- /content-for -->
