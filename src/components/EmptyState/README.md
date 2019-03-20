---
name: Empty state
category: Structure
platforms:
  - android
  - ios
  - web
keywords:
  - EmptyState
  - lander
  - welcome
  - explain features
  - describe features
  - educate about features
  - merchant education
  - educational opportunity
  - educational opportunities
  - illustration on pages
  - empty layouts
  - empty states
  - starting pages
  - starting layouts
  - educating
  - teaching
  - landing pages
  - landing layouts
---

# Empty state

Empty states are used when a list, table, or chart has no items or data to show. This is an opportunity to provide explanation or guidance to help merchants progress. The empty state component is intended for use when a full page in the admin is empty, and not for individual elements or areas in the interface.

---

## Best practices

Empty states should:

- Orient merchants by clearly explaining the benefit and utility of a product
  or feature
- Simplify a complicated experience by focusing on a few key features and
  benefits
- Use simple and clear language that empowers merchants to move their business
  forward
- Be encouraging and never make merchants feel unsuccessful or guilty because
  they haven’t used a product or feature
- Explain the steps merchants need to take to activate a product or feature
- Use illustrations thoughtfully as outlined in our [illustration guidelines](/design/illustrations)
- Use only one primary call-to-action button

---

## Content guidelines

### Title

- Descriptive: help merchants understand the feature or product related to the
  empty state
- Concise and scannable:
  - Use simple, clear language that can be read at-a-glance
  - Keep titles to single sentence and avoid using punctuation such as periods,
    commas, or semicolons
  - Written in sentence case (the first word capitalized, the rest lowercase)
  - Action-oriented: encourage merchants to take the step required to
    activate the product or feature

<!-- usagelist -->

#### Do

- Create orders and send invoices

#### Don’t

- Orders and invoices

<!-- end -->

### Subtitle

Empty state subtitles act like body content. They should:

- Describe or explain what’s in the empty state title or item title
- Be conversational: include articles such as the, a, and an

### Primary action

Buttons are used for the most important actions you want merchants to take.
They should be:

- Clear and predictable: merchants should be able to anticipate what will
  happen when they click a button. Never deceive merchants by using misleading
  titles.

<!-- usagelist -->

#### Do

- Create order
- Buy shipping label

#### Don’t

- New order
- Buy

<!-- end -->

- Action-led: buttons should always lead with a strong verb that encourages
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

- Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->

#### Do

- Add menu item

#### Don’t

- Add a menu item

<!-- end -->

### Secondary action

Secondary actions are used for less important actions such as “Learn more” or
“Close” buttons. They should follow all the other content rules outlined for
primary buttons.

---

## Examples

### Default empty state

Use to explain a single feature before merchants have used it.

```jsx
<EmptyState
  heading="Manage your inventory transfers"
  action={{content: 'Add transfer'}}
  secondaryAction={{content: 'Learn more', url: 'https://help.shopify.com'}}
  image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
>
  <p>Track and receive your incoming inventory from suppliers.</p>
</EmptyState>
```

### Empty state with subdued footer context

Use to provide additional but non-critical context for a new product or feature. Can also be used to include a subdued call to action for secondary or tertiary actions.

```jsx
<EmptyState
  heading="Manage your inventory transfers"
  action={{content: 'Add transfer'}}
  secondaryAction={{content: 'Learn more', url: 'https://help.shopify.com'}}
  footerContent={
    <p>
      If you don’t want to add a transfer, you can import your inventory from{' '}
      <Link monochrome url="/settings">
        settings
      </Link>
      .
    </p>
  }
  image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
>
  <p>Track and receive your incoming inventory from suppliers.</p>
</EmptyState>
```

<!-- content-for: android -->

![Default empty state](/public_images/components/EmptyState/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Default empty state](/public_images/components/EmptyState/ios/default@2x.png)

<!-- /content-for -->

---

## Related components

- To learn more about illustrations for empty states, [read the illustration guidelines](/design/illustrations)
- To create page-level layout, [use the layout component](/components/structure/layout)
- To highlight a Shopify feature, [use the callout card component](/components/structure/callout-card)
