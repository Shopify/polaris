---
name: Embedded alert
category: Embedded
order: 3
hidePlayground: true
keywords:
  - embedded
  - alerts
  - acknowledgement
  - confirmation
  - modals
  - pop ups
  - pop-ups
  - overlays
  - disruptive
  - disruptors
  - delete
  - deletions
  - cancel
  - leave page
  - stay
  - discard
  - alert messaging
  - prevent dangerous actions
  - risky actions
  - irreversible actions
  - conformation alerts
  - warnings
  - preventative
  - confirmation messaging
---

# Embedded alert

Embedded alerts are similar to [embedded modals](https://polaris.shopify.com/components/embedded/embedded-modal), but use no more than two calls to action and only one string of body text. They are simpler to implement than embedded modals, and add consistency for alert and confirmation messages.

This component only works within embedded apps. Read the [Embedded App SDK (EASDK) getting started guide](https://github.com/Shopify/polaris/blob/master/documentation/Embedded%20apps.md) for more details on how to use the EASDK with Polaris.

---

## Properties

| Prop             | Type       | Description                                                             |
| ---------------- | ---------- | ----------------------------------------------------------------------- |
| open\*           | boolean    | Whether the alert is open                                               |
| children\*       | string     | The content to display inside the alert                                 |
| title            | string     | The alert title                                                         |
| destructive      | boolean    | For confirming a destructive or dangerous action                        |
| confirmContent\* | string     | The content of the confirmation button                                  |
| cancelContent    | string     | The content of the cancel button                                        |
| onConfirm\*      | function() | Callback when the confirmation button is clicked                        |
| onClose\*        | function() | Callback when the alert is closed, or when the cancel button is clicked |

---

## Screenshot examples

These static images are provided to help visualize the interface since embedded components can only be rendered inside the Shopify admin.

### Basic alert

![Screenshot basic alert component](embedded/alert/basic-alert.jpg)

### Destructive warning

![Screenshot destructive warning component](embedded/alert/destructive-warning.jpg)

---

## Best practices

Embedded alerts should:

* Be used for in-context tasks that require information to be acknowledged before continuing, or require confirmation of an action that can’t be undone or is difficult to undo (with the option to back out).
* For alert messages, keep body content to line of text and don’t use more than one call to action.
* For confirmation messages, always give merchants the clear option to confirm or back out. Keep body content to one line of text and don’t use more than two calls to action.
* Not be used as a way to present additional sections of content without actions because they can disrupt a merchant’s workflow.
* Not be used for complicated flows that require a merchant to take multiple paths or complete more than one primary task.

---

## Content guidelines

### Title

Embedded alert titles should be:

* Informative and descriptive:
  * For alert messages, they should label the type of content grouped in the alert
  * For confirmation messages, they should concisely ask if the merchant wants to continue, using a clear {verb}+{noun} question
* Concise and scannable:
  * Use simple, clear language that can be read at a glance
  * Keep to a single sentence and avoid using any punctuation, with the exception of question marks for confirmation messages
  * Try to avoid articles (the, a, an) to keep content short and actionable
* Written in sentence case (first word capitalized, the rest is lowercase)

**Confirmation messages examples**

<!-- usagelist -->

#### Do

* Discard unsaved changes?
* Delete 2 collections?
* Delete Dark Blue Tee?
* Leave page with unsaved changes?

#### Don’t

* Discard?
* Are you sure you want to delete?
* Are you sure you want to delete Dark Blue Tee?
* This page has unsaved changes are you sure you want to leave?

<!-- end -->

### Body content

Body content:

* For alert messages, clearly explain what the merchant needs to acknowledge
* For confirmation messages, clearly explain if the action is irreversible or difficult to undo, and [use plain language](https://polaris.shopify.com/content/product-content#write-for-a-grade-7-reading-level).
* Be concise: use only one line of text. Don’t start the sentence with, “Are you sure?”.

**Confirmation messages examples**

<!-- usagelist -->

#### Do

* This can’t be undone.
* This will delete all edits since you last saved.
* Leaving this page will delete all unsaved changes.

#### Don’t

* Are you sure you want to delete the variant Dark Blue Tee/Small/Silk? This action cannot be reversed.
* If you discard changes, you’ll delete any edits you made since you last saved.
* If you leave this page, all unsaved changes will be lost. Are you sure you want to leave this page?

<!-- end -->

### Primary and secondary actions

Actions should be:

* Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive a merchant by mislabeling an action.
* To provide enough context to merchants and to make the copy action-led, we usually use the {verb}+{noun} format in buttons. The exception is with alert and confirmation messaging where common actions are Discard, Cancel, Stay, OK, Got it, or Delete.
* Scannable: avoid unnecessary words and articles such as the, an, or a.

**Confirmation messages examples**

**Deletions**

Before a merchant can delete objects like collections, transfers, products, and variants, we present them with a confirmation message with two calls to action, one to [Cancel] and one to [Delete]. We keep it short and don’t use {verb}+{noun} button copy to make it mobile-friendly.

Primary actions:

<!-- usagelist -->

#### Do

* Delete

#### Don’t

* Remove
* Erase
* Discard

<!-- end

Secondary action:

<!-- usagelist -->

#### Do

* Cancel

#### Don’t

* Discard

<!-- end -->

**Discarding changes while on a page**

Primary action:

<!-- usagelist -->

#### Do

* Discard

#### Don’t

* Cancel

<!-- end -->

Secondary action:

<!-- usagelist -->

#### Do

* Keep editing

#### Don’t

* Go back
* Cancel

<!-- end -->

**Leaving a page with unsaved changes**

Primary action:

<!-- usagelist -->

#### Do

* Leave page

#### Don’t

* Exit
* Delete changes

<!-- end -->

Secondary action:

<!-- usagelist -->

#### Do

* Stay

#### Don’t

* Go back
* Cancel
* Discard
* Keep editing

<!-- end -->

---

## Examples

### Basic alert

```jsx
<Alert
  title="Accept terms and conditions"
  open={this.state.open}
  confirmContent="I accept"
  onConfirm={() => this.setState({open: false, confirmed: true})}
  onClose={() => this.setState({open: false})}
>
  You must accept the terms and conditions before proceeding.
</Alert>
```

### Destructive warning

Use passing `destructive` to make it clear to the merchant that the action is potentially dangerous. Only use this option when the merchant is about to perform an action that they can’t undo.

```jsx
<Alert
  title="Discard unsaved changes?"
  open={this.state.open}
  destructive
  confirmContent="Keep editing"
  onConfirm={() => this.setState({open: false, confirmed: true})}
  cancelContent="Discard"
  onClose={() => this.setState({open: false, confirmed: false})}
>
  This will delete all edits since you last saved.
</Alert>
```

---

## Related components

* If you want to present general content in an overlay in an embedded app, [use the embedded modal component](https://polaris.shopify.com/components/embedded/embedded-modal)
* To present confirmation that a merchant action was successful in an embedded app, [use the embedded flash notice method](https://github.com/Shopify/polaris/blob/master/documentation/Embedded%20apps.md#easdkshowflashnotice)
* To communicate a change or condition that needs the merchant’s attention within the context of a page, and offers next steps, [use the banner component](https://polaris.shopify.com/components/feedback-indicators/banner)
