---
name: Alert
tags:
  - embedded
  - alert
  - confirm
  - pop up
  - overlays
  - disruptive
  - disruptor
category: Embedded
hidePlayground: true
---

# Alert
Alerts present a modal dialog in the interface that can be useful to provide confirmation for a merchant action (particularly when the action is potentially dangerous), or to simply provide important information that the merchant needs to see.

This component only works within embedded apps. Read the [Embedded App SDK (EASDK) getting started guide](https://github.com/Shopify/polaris/blob/master/documentation/Embedded%20apps.md) for more details on how to use the EASDK with Polaris.

---

## Properties

| Prop | Type | Description |
| ---- | ---- | ----------- |
| open* | boolean | Whether the alert is open |
| children* | string | The content to display inside the alert |
| title | string | The alert title |
| destructive | string | For confirming a destructive or dangerous action |
| confirmContent* | string | The content of the confirmation button |
| cancelContent | string | The content of the cancel button |
| onConfirm* | function() | Callback when the confirmation button is clicked |
| onCancel | function() | Callback when the cancel button is clicked |

---

## Examples

### Basic alert

Use when you don't provide `onCancel` and `cancelContent` and the merchant must click on the confirmation button to proceed.

```jsx
<Alert
  title="Accept terms and conditions"
  open={this.state.open}
  confirmContent="I accept"
  onConfirm={() => this.setState({open: false, confirmed: true})}
>
  You must accept the terms and conditions before proceeding.
</Alert>
```

### Destructive warning

Use passing `destructive` to make it clear to the merchant that the action is potentially dangerous. Only use this option when the merchant is about to perform an action that they can’t undo.

```jsx
<Alert
  title="Unsaved changes"
  open={this.state.open}
  confirmContent="Discard changes"
  onConfirm={() => this.setState({open: false, confirmed: true})}
  cancelContent="Continue editing"
  onCancel={() => this.setState({open: false, confirmed: false})}
>
  Leaving will cause the changes to your product to be lost.
</Alert>
```
