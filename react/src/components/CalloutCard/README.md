---
name: Callout card
category: Structure
keywords:
  - CalloutCard
  - actionable
  - updates
  - new features
  - call out card
  - sales channel card
  - feature card
  - callout card heading
  - callout card body content
  - callout card text
  - callout card cta
  - callout card call to action
  - callout card button
  - callout card with secondary cta
  - callout card with secondary button
  - dismissible callout card
  - card with illustration
  - card with image
  - illustration card
---

# Callout card

Callout cards are used to encourage merchants to take an action related to a
new feature or opportunity. They are most commonly displayed in the
sales channels section of Shopify.

---

## Best practices

Callout cards should:

- Clearly articulate the benefit of the feature and what it does
- Provide merchants with a clear call to action
- Be targeted to merchants who will most benefit from the feature
- Be dismissable so merchants can get rid of cards about features they’re not
  interested in
- Use an illustration that helps to communicate the subject or merchant benefit

---

## Content guidelines

### Title

Callout card titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings).

### Body content

Body content should be:

- Actionable: start sentences with imperative verbs when telling merchants
  what actions are available to them (especially something new). Don’t use
  permissive language like “you can”.

<!-- usagelist -->

#### Do

Get performance data for all your sales channels.

#### Don’t

Now you can get performance data for all your sales channels.

<!-- end -->

- Structured for merchant success: always put the most critical information
  first
- Clear: use the verb “need” to help merchants understand when they’re required
  to do something

<!-- usagelist -->

#### Do

To buy a shipping label, you need to enter the total weight of your shipment,
including packaging.

#### Don’t

To buy a shipping label, you must enter the total weight of your shipment,
including packaging.

<!-- end -->

### Call to action

Buttons should be:

Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by mislabeling a button.

<!-- usagelist -->

#### Do

Buy shipping label

#### Don’t

Buy

<!-- end -->

- Action-led: buttons should always lead with a strong verb that encourages
  action. To provide enough context to merchants use the {verb}+{noun} format on
  buttons except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->

#### Do

View shipping settings

#### Don’t

View your settings

<!-- end -->

- Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->

#### Do

Add menu item

#### Don’t

Add a menu item

<!-- end -->

---

## Examples

### Default callout card

Use to let merchants know about a feature or opportunity where there is a clear, single action they need to take to move to the next step.

```jsx
<CalloutCard
  title="Customize the style of your checkout"
  illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
  primaryAction={{
    content: 'Customize checkout',
    url: 'https://www.shopify.com',
  }}
>
  <p>Upload your store’s logo, change colors and fonts, and more.</p>
</CalloutCard>
```

### Callout card with secondary action

Use to let merchants know about a feature or opportunity where there are two distinct actions they can take on the information.

```jsx
<CalloutCard
  title="Customize the style of your checkout"
  illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
  primaryAction={{content: 'Customize checkout'}}
  secondaryAction={{content: 'Learn more about customizing checkout'}}
>
  <p>Upload your store’s logo, change colors and fonts, and more.</p>
</CalloutCard>
```

### Dismissable callout card

Make all callout cards dismissible so merchants can get rid of cards about features they’re not interested in.

```jsx
<CalloutCard
  title="Customize the style of your checkout"
  illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
  primaryAction={{content: 'Customize checkout'}}
  onDismiss={() => {}}
>
  <p>Upload your store’s logo, change colors and fonts, and more.</p>
</CalloutCard>
```

---

## Related components

- To group similar concepts and tasks together, [use the card component](https://polaris.shopify.com/components/structure/card)
- To create page-level layout, [use the layout component](https://polaris.shopify.com/components/structure/layout)
- To explain a feature that merchants haven’t tried yet, [use the empty state component](https://polaris.shopify.com/components/structure/empty-state)

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

The required `title` prop gives the callout card a level 2 heading (`<h2>`). This helps with readability and provides structure to screen reader users.

Illustrations included in callout cards are implemented as decorative images with empty `alt` attributes (`alt=""` ) so that they’re skipped by screen readers.

Use [actionable language](https://polaris.shopify.com/content/actionable-language#navigation) to ensure that the purpose of the callout card is clear to all merchants, including those with issues related to reading and language.

<!-- /content-for -->
