---
name: Badge
category: Images and icons
keywords:
  - pills
  - status indicators
  - color-coded indicators
  - informational badge
  - success badge
  - attention badge
  - warning badge
  - critical badge
  - object status
  - status
  - alert
---

# Badge

Badges are used to inform merchants of the status of an object or of an action that’s been taken.

---

## Best practices

Badges benefit merchants by:

- Using established color patterns so that merchants can quickly identify their status or importance level
- Being clearly labeled with short, scannable text
- Being positioned to clearly identify the object they’re informing or labelling

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

<!-- dodont -->

#### Don’t

Don’t use alternatives to existing badge options. Only create a new badge option if there aren’t any existing options to communicate the status you need.

<!-- end -->

---

## Examples

### Default

Use to give a non-critical status update on a piece of information or action.

```jsx
<Badge>Fulfilled</Badge>
```

### Small

Use in layouts with minimal space, like inside of an `IndexTable` cell.

```jsx
<Badge size="small">Fulfilled</Badge>
```

### Informational

Use to call out an object or action as having an important attribute. For example, marking an option as “Recommended” or marking a theme as “Published”.

```jsx
<Badge status="info">Published</Badge>
```

### Success

Use to indicate a successful, completed, or desirable state when it’s important to provide positive reinforcement to merchants. For example, when merchants successfully dispute a chargeback, a success badge shows that says “Funds recovered”.

```jsx
<Badge status="success">Funds recovered</Badge>
```

### Attention

Use when something requires merchants’ attention but the issue isn’t critical. For example, this badge would show next to an order that needs to be reviewed by merchants.

```jsx
<Badge status="attention">Inactive</Badge>
```

### Warning

Use for warnings and time-sensitive issues that require merchants’ attention and potential action. Warning events are often reversible. Keep in mind that seeing this badge can feel stressful for merchants so it should only be used when absolutely necessary.

```jsx
<Badge status="warning">Expired</Badge>
```

### Critical

Use for critical and irreversible issues that require merchants’ attention and potential action. Keep in mind that seeing this badge can feel stressful for merchants so it should only be used when absolutely necessary.

```jsx
<Badge status="critical">Action required</Badge>
```

### Incomplete

Use to indicate when a given task has not yet been completed. For example, when merchants haven’t fulfilled an order.

```jsx
<Badge progress="incomplete" status="warning">
  Unfulfilled
</Badge>
```

### Partially complete

Use to indicate when a given task has been partially completed. For example, when merchants have partially fulfilled an order.

```jsx
<Badge progress="partiallyComplete" status="attention">
  Partially fulfilled
</Badge>
```

### Complete

Use to indicate when a given task has been completed. For example, when merchants have fulfilled an order.

```jsx
<Badge progress="complete">Fulfilled</Badge>
```

### With statusAndProgressLabelOverride

Use when the status and progress accessibilityLabels are not appropriate to a given context.

```jsx
<Badge
  status="success"
  progress="complete"
  statusAndProgressLabelOverride="Status: Published. Your online store is visible."
>
  Published
</Badge>
```

---

## Related components

- To represent an interactive list of categories provided by merchants, [use tags](https://polaris.shopify.com/components/tag)

---

## Accessibility

Badges that convey information with icons or color include text provided by the [visually hidden component](https://polaris.shopify.com/components/visually-hidden#navigation). This text is read out by assistive technologies like screen readers so that merchants with vision issues can access the meaning of the badge in context.
