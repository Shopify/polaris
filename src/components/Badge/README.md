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

## Design guidelines

Great badges benefit merchants by:

- Using established color patterns so that merchants can quickly identify their status or importance level
- Being clearly labeled with short, scannable text
- Being positioned to clearly identify the object they’re informing or labelling (example: an order)

---

## Content guidelines

Badge label — ‘ui_badge’

Badge labels should be

---

## API

| Properties  | Type | Description  |
| ----------- | ---- | ------------ |
| status | enum['success', 'subdued', 'info', 'attention', 'warning', 'critical'] | Set the color of the badge for the given status. |
| children     | React.ReactNode | The content to display inside the badge. |

---

## Examples

### Basic badge

Use when ...

```jsx
<Badge>Default</Badge>
```

### Subdued badge

Use when ...

```jsx
<Badge status="subdued">Subdued</Badge>
```

### Informational badge

Use when ...

```jsx
<Badge status="info">Information</Badge>
```

### Success badge

Use when an event or action has been successfully completed. For example, this badge would show next to an order that’s been fulfilled.

```jsx
<Badge status="success">Success</Badge>
```

### Attention badge

Use when something requires a merchant’s attention but the issue isn’t critical. For example, this badge would show next to an order that needs to be reviewed by the merchant.

```jsx
<Badge status="attention">Attention</Badge>
```

### Warning badge

Use when something requires a merchant to take immediate action. For example, this badge would show ...

```jsx
<Badge status="warning">Warning</Badge>
```

### Critical badge

Use only for the most critical and time sensitive issues that require a merchant’s attention. Keep in mind that seeing this badge can feel stressful for merchants so it should be used when absolutely necessary.

```jsx
<Badge status="critical">Critical</Badge>
```
