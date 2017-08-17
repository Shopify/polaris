---
name: Embedded modal
tags:
  - embedded
  - pop up
  - overlays
  - disruptive
  - disruptor
  - multiple sections
  - custom width
  - custom height
category: Embedded
hidePlayground: true
---

# Embedded modal
Embedded modals are overlays that prevent merchants from interacting with the rest of the application until a specific action is taken. They can be disruptive because they require merchants to take an action before they can continue interacting with the rest of Shopify. It should be used thoughtfully and sparingly.

---

## Purpose

Think about the merchant problem this component solves when you’re using it:

**Problem:**

Merchants need a way to focus on certain tasks that can’t be left half-finished.

**Solution:**

Embedded modals require merchants to take an action before they can continue working in other parts of Shopify. It helps them maintain focus or stay in the workflow because the changes can’t be automatically saved.

This component only works within embedded apps. Read the [Embedded App SDK (EASDK) getting started guide](https://github.com/Shopify/polaris/blob/master/documentation/Embedded%20apps.md) for more details on how to use the EASDK with Polaris.

---

## Best practices

Embedded modals should:

- Be used for in-context tasks that require an explicit action to be taken
- Be used for focused, specific tasks that can’t be left half-completed
- Include no more than a single primary call to action
- Not be used as a way to present additional sections of content without actions because they can disrupt a merchant’s workflow
- Not be used for complicated flows that require a merchant to take multiple paths or complete more than one primary task

---

## Content guidelines

### Title

Titles should be:

- Informative and descriptive
  - They should label the type of content grouped in the modal
- Concise and scannable:
  - Use simple, clear language that can be read at a glance
  - Keep headings to single sentence and avoid using punctuation such as periods, commas, or semicolons
  - Avoid articles (the, a, an) in [microcopy headings](/content/grammar-and-mechanics#headings-and-subheadings) to keep content short and actionable
  - Written in sentence case (first word capitalized, the rest is lowercase)

<!-- usagelist -->
#### Do
Edit email address

#### Don't
Edit the email address for this order
<!-- end -->

### Body content

Body content should be:

- Actionable: start sentences with imperative verbs when telling a merchant what actions are available to them (especially something new). Don't use permissive language like "you can".

<!-- usagelist -->
#### Do
Notification emails will be sent to this address.

#### Don't
You can edit the email address where emails will be sent.
<!-- end -->

- Structured for merchant success: always put the most critical information first.
- Clear: use the verb “need” to help merchants understand when they’re required to do something.

<!-- usagelist -->
#### Do
To buy a shipping label, you need to enter the total weight of your shipment, including packaging.

#### Don't
To buy a shipping label, you must enter the total weight of your shipment, including packaging.
<!-- end -->

### Primary and secondary actions

Actions should be:

- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive a merchant by mislabeling an action.

<!-- usagelist -->
#### Do
- Create order
- Buy shipping label

#### Don't
- New order
- Buy
<!-- end -->

- Action-led: actions should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on actions except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->
#### Do
- Activate Apple Pay
- View shipping settings

#### Don't
- Try Apple Pay
- View your settings
<!-- end -->

- Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->
#### Do
Add menu item

#### Don't
Add a menu item
<!-- end -->

---

## Properties

| Prop | Type | Description |
| ---- | ---- | ----------- |
| open* | boolean | Whether the modal is open or not |
| src* | string | The URL that will be loaded as the content of the modal |
| title | string | Modal title, in large type |
| width | enum['large', 'fullwidth'] | Controls the width of the modal |
| height | number | The height of the modal (in pixels) |
| primaryAction | Action | Primary action |
| secondaryActions | Action[] | Collection of secondary actions |
| onClose* | function() | Callback when the modal is closed |

---

## Examples

### Embedded modal

```jsx
<Modal
  src="https://my-app.com/update-information"
  open={this.state.open}
  title="Edit account information"
  primaryAction={{
    content: 'Update account',
    onAction: () => this.setState({open: false}),
  }}
  secondaryActions={[{
    content: 'Change account',
    onAction: () => this.setState({open: false}),
  }]}
  onClose={() => this.setState({open: false})}
/>
)
```

---

## Related components

* To present large amounts of additional information or actions that don’t require confirmation, [use the collapsible component](/components/collapsible) to expand content in place within the page
* To present a small amount of content or a menu of actions in a non-blocking overlay, [use the popover component](/components/popover)
* To communicate a change or condition that needs the merchant’s attention within the context of a page, [use the banner component](/components/banner)
* To present confirmation that an action was successful, [use the flash message  component](/components/flash message)
