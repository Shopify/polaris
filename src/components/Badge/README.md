---
name: Badge
tags:
  - status
  - alert
  - label
category: Images and icons
---

# Badge

Badges are used to inform merchants of the status of a piece of information or of an action that’s been taken.

For example, when a customer has received the item they purchased from a merchant, a badge that says “Completed” shows next to the order number.

---

## Purpose

Think about the merchant problem this component solves when you’re using it:

**Problem**

Merchants are pressed for time. They need indicators that let them identify important status changes in Shopify.

**Solution**

Badges are designed as short, color-coded indicators that help merchants identify critical information quickly.

---

## Best practices

Great badges benefit merchants by:

- Using established color patterns so that merchants can quickly identify their status or importance level
- Being clearly labeled with short, scannable text
- Being positioned to clearly identify the object they’re informing or labelling (e.g. an order)

---

## Content guidelines

### Badge label

Badge labels should:

- Use a single word to describe the status of an object.
- Only use two words if you need to describe a complex state. For example, “Partially refunded” and “Partially fulfilled”.
- Always describe the status in the past tense. For example, refunded not refund.

The available badges for financial status are:

- Authorized
- Pending
- Paid
- Unpaid
- Pending
- Voided
- Partially paid
- Partially refunded
- Refunded

The available badges for fulfillment status are:

- Fulfilled
- Complete
- Partial
- Unfulfilled
- Restocked

<!-- usagelist -->
#### Don’t

Don’t use alternatives to existing badge options. Only create a new badge option if there aren’t any existing options to communicate the status you need.
<!-- end -->

---

| Properties | Type | Description |
| ---------- | ---- | ----------- |
| children | string | The content to display inside the badge. |
| status | enum['success', 'info', 'attention', 'warning'] | Set the color of the badge for the given status. |

## Examples

### Default badge

Use to give a non-critical status update on a piece of information or action.

```tsx
<Badge>Fulfilled</Badge>
```

### Informational badge

Use to call out an object or action as having an important attribute. For example, marking an option as “Recommended” or marking a theme as “Published”.

```jsx
<Badge status="info">Published</Badge>
```

### Success badge

Use to indicate a successful, completed, or desirable state when it’s important to provide positive reinforcement to the merchant. For example, when a merchant successfully disputes a chargeback, a success badge shows that says “Funds recovered”.

```jsx
<Badge status="success">Funds recovered</Badge>
```

### Attention badge

Use when something requires a merchant’s attention but the issue isn’t critical. For example, this badge would show next to an order that needs to be reviewed by the merchant.

```jsx
<Badge status="attention">Unfulfilled</Badge>
```

### Warning badge

Use for the most critical and time sensitive issues that require a merchant’s attention. Keep in mind that seeing this badge can feel stressful for merchants so it should be used when absolutely necessary.

```jsx
<Badge status="warning">SSL unavailable</Badge>
```
---

## Related components

* To represent an interactive list of categories provided by merchants, [use tags](/components/forms/tag).
