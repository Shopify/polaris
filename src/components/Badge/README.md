---
name: Badge
tags:
  - badge
  - alert
category: Structure
---

# Badge

Badges are used to inform merchants of the status of a piece of information or of an action that’s been taken. For example, when a customer has received the item they purchased from a merchant, a badge that says “Completed” will show next to the order number.

## Problem

Merchants are pressed for time. They need indicators that let them identify important status changes in their Shopify admin.

## Solution

Badges are designed as short, color coded indicators that help merchants identify critical information quickly.
Guidelines

---

## Design guidelines

Great badges benefit merchants by:

- Using established color patterns so that merchants can quickly identify their status or importance level
- Being clearly labeled with short, scannable text
- Being positioned to clearly identify the object they’re informing or labelling (example: an order)

---

## Content guidelines

### Badge label

Badge labels should:

- Use a single word to describe the status of an object.
- Only use two words if you need to describe a complex state. For example, “Partially refunded” and “Partially fulfilled”.
- Always describe the status in the past tense. For example, refunded not refund.

#### Do

*Financial status:*

- Authorized
- Pending
- Paid
- Unpaid
- Pending
- Voided
- Partially paid
- Partially refunded
- Refunded

*Fulfillment status:*

- Fulfilled
- Complete
- Partial
- Unfulfilled
- Restocked

#### Don't

Use alternatives to existing badge options. Only create a new badge option if there aren't any existing options to communicate the status you need.

---

| Properties | Type | Description |
| ---------- | ---- | ----------- |
| status | enum['success', 'info', 'attention', 'warning', 'critical'] | Set the color of the badge for the given status. |
| children | React.ReactNode | The content to display inside the badge. |

## Examples

### Default badge

Used to give a non-critical status update on a piece of information or action.

```tsx
<Badge>Default</Badge>
```

### Informational badge

Used to call out an object or action as having an important attribute. For example, marking an option as “Recommended” or marking a theme as “Published”.

```jsx
<Badge status="info">Information</Badge>
```

### Success badge

Used to indicate a successful, completed, or desirable state when it’s important to provide positive reinforcement to the merchant. For example, when a merchant successfully disputes a chargeback, a success badge shows that says “Funds recovered”.

```jsx
<Badge status="success">Success</Badge>
```

### Attention badge

Use when something requires a merchant’s attention but the issue isn’t critical. For example, this badge would show next to an order that needs to be reviewed by the merchant.

```jsx
<Badge status="attention">Attention</Badge>
```

### Warning badge

Use for the most critical and time sensitive issues that require a merchant’s attention. Keep in mind that seeing this badge can feel stressful for merchants so it should be used when absolutely necessary.

```jsx
<Badge status="warning">Warning</Badge>
```

### Critical badge

Use only for the most critical and time sensitive issues that require a merchant’s attention. Keep in mind that seeing this badge can feel stressful for merchants so it should be used when absolutely necessary.

```jsx
<Badge status="critical">Critical</Badge>
```
