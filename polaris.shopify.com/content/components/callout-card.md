---
title: Callout card
description: Callout cards are used to encourage merchants to take an action related to a new feature or opportunity. They are most commonly displayed in the sales channels section of Shopify.
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
examples:
  - fileName: callout-card-default.tsx
    title: Default
    description: Use to let merchants know about a feature or opportunity where there is a clear, single action they need to take to move to the next step.
  - fileName: callout-card-with-secondary-action.tsx
    title: With secondary action
    description: Use to let merchants know about a feature or opportunity where there are two distinct actions they can take on the information.
  - fileName: callout-card-dismissable.tsx
    title: Dismissable
    description: Make all callout cards dismissible so merchants can get rid of cards about features they’re not interested in.
---

## Best practices

Callout cards should:

- Clearly articulate the benefit of the feature and what it does
- Provide merchants with a clear call to action
- Be targeted to merchants who will most benefit from the feature
- Be dismissable so merchants can get rid of cards about features they’re not interested in
- Use an illustration that helps to communicate the subject or merchant benefit

---

## Content guidelines

### Title

Callout card titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).

### Body content

Body content should be:

- Actionable: start sentences with imperative verbs when telling merchants what actions are available to them (especially something new). Don’t use permissive language like “you can”.

<!-- dodont -->

#### Do

Get performance data for all your sales channels.

#### Don’t

Now you can get performance data for all your sales channels.

<!-- end -->

- Structured for merchant success: always put the most critical information first
- Clear: use the verb “need” to help merchants understand when they’re required to do something

<!-- dodont -->

#### Do

To buy a shipping label, you need to enter the total weight of your shipment, including packaging.

#### Don’t

To buy a shipping label, you must enter the total weight of your shipment, including packaging.

<!-- end -->

### Call to action

Buttons should be:

Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by mislabeling a button.

<!-- dodont -->

#### Do

Buy shipping label

#### Don’t

Buy

<!-- end -->

- Action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.

<!-- dodont -->

#### Do

View shipping settings

#### Don’t

View your settings

<!-- end -->

- Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- dodont -->

#### Do

Add menu item

#### Don’t

Add a menu item

<!-- end -->

---

## Related components

- To group similar concepts and tasks together, [use the card component](https://polaris.shopify.com/components/card)
- To create page-level layout, [use the layout component](https://polaris.shopify.com/components/layout)
- To explain a feature that merchants haven’t tried yet, [use the empty state component](https://polaris.shopify.com/components/empty-state)

---

## Accessibility

The required `title` prop gives the callout card a level 2 heading (`<h2>`). This helps with readability and provides structure to screen reader users.

Illustrations included in callout cards are implemented as decorative images with empty `alt` attributes (`alt=""` ) so that they’re skipped by screen readers.

Use [actionable language](https://polaris.shopify.com/content/actionable-language#navigation) to ensure that the purpose of the callout card is clear to all merchants, including those with issues related to reading and language.
