---
name: Badge
category: Images and icons
platforms:
  - android
  - ios
  - web
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
  - ios
  - android
examples:
  - fileName: badge-default.tsx
    title: Default badge
    description: >-
      Use to give a non-critical status update on a piece of information or
      action.
  - fileName: badge-small.tsx
    title: Small badge
  - fileName: badge-informational.tsx
    title: Informational badge
    description: >-
      Use to call out an object or action as having an important attribute. For
      example, marking an option as “Recommended” or marking a theme as
      “Published”.
  - fileName: badge-success.tsx
    title: Success badge
    description: >-
      Use to indicate a successful, completed, or desirable state when it’s
      important to provide positive reinforcement to merchants. For example,
      when merchants successfully dispute a chargeback, a success badge shows
      that says “Funds recovered”.
  - fileName: badge-attention.tsx
    title: Attention badge
    description: >-
      Use when something requires merchants’ attention but the issue isn’t
      critical. For example, this badge would show next to an order that needs
      to be reviewed by merchants.
  - fileName: badge-warning.tsx
    title: Warning badge
    description: >-
      Use for critical and time-sensitive issues that require merchants’
      attention and potential action. Warning events are often reversible.Keep
      in mind that seeing this badge can feel stressful for merchants so it
      should only be used when absolutely necessary.
  - fileName: badge-critical.tsx
    title: Critical badge
    description: >-
      Use for critical and irreversible issues that require merchants’ attention
      and potential action.Keep in mind that seeing this badge can feel
      stressful for merchants so it should only be used when absolutely
      necessary.
  - fileName: badge-incomplete.tsx
    title: Incomplete badge
    description: >-
      Use to indicate when a given task has not yet been completed. For example,
      when merchants haven’t fulfilled an order.
  - fileName: badge-partially-complete.tsx
    title: Partially complete badge
    description: >-
      Use to indicate when a given task has been partially completed. For
      example, when merchants have partially fulfilled an
      order.
  - fileName: badge-complete.tsx
    title: Complete badge
    description: >-
      Use to indicate when a given task has been completed. For example, when
      merchants have fulfilled an order.
  - fileName: badge-with-status-and-progress-label-override.tsx
    title: Badge with statusAndProgressLabelOverride
    description: >-
      Use when the status and progress accessibilityLabels are not appropriate
      to a given context.
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

<!-- usagelist -->

#### Don’t

Don’t use alternatives to existing badge options. Only create a new badge option if there aren’t any existing options to communicate the status you need.

<!-- end -->

---

## Related components

- To represent an interactive list of categories provided by merchants, [use tags](https://polaris.shopify.com/components/forms/tag)

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

Badges that convey information with icons or color include text provided by the [visually hidden component](https://polaris.shopify.com/components/titles-and-text/visually-hidden#navigation). This text is read out by assistive technologies like screen readers so that merchants with vision issues can access the meaning of the badge in context.

<!-- /content-for -->
