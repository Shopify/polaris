---
name: Toast
category: Overlays
keywords:
  - flash
  - flash message
  - toast
  - message
  - overlay
  - popup
  - easdk
  - iframe
  - embedded app
  - duration
---

# Toast

The toast component is a non-disruptive message that appears at the bottom of the interface to provide quick, at-a-glance feedback on the outcome of an action.

---

## Required components

The toast component must be wrapped in the [frame](/components/structure/frame) component.

---

## Best practices

Toast should:

- Be used for short messages to confirm an action
- Not be used for actionable links or messages
- Not be used for error messages

---

## Content guidelines

### MESSAGE

Messages should be:

- Short and affirmative
- Written in the pattern of: noun + verb

<!-- usagelist -->

#### Do

- Settings saved
- Buy Button removed
- Discount deleted

#### Don’t

- Your settings were saved
- Removed
- Deleted discount

<!-- end -->

## Examples

### Basic toast

Use to convey general confirmation or actions that aren’t critical. For example, you might show a toast message to inform the merchant that their recent action was successful.

```jsx
class ToastExample extends React.Component {
  state = {
    showToast: false,
  };

  render() {
    const {showToast} = this.state;
    const toastMarkup = showToast ? (
      <Toast content="Message sent" onDismiss={this.toggleToast} />
    ) : null;

    return (
      <Frame>
        <Page title="Toast example">
          <Button onClick={this.toggleToast}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    );
  }

  toggleToast = () => {
    this.setState(({showToast}) => ({showToast: !showToast}));
  };
}
```

### Multiple toast messages

Use multiple toast messages to inform the merchant about distinct actions.

```jsx
class ToastExample extends React.Component {
  state = {
    showToast1: false,
    showToast2: false,
  };

  render() {
    const {showToast1, showToast2} = this.state;
    const toastMarkup1 = showToast1 ? (
      <Toast content="Message sent" onDismiss={this.toggleToast1} />
    ) : null;

    const toastMarkup2 = showToast2 ? (
      <Toast content="Image uploaded" onDismiss={this.toggleToast1} />
    ) : null;

    return (
      <Frame>
        <Page title="Toast example">
          <Button onClick={this.toggleToast1}>Show toast 1</Button>
          <Button onClick={this.toggleToast2}>Show toast 2</Button>
          {toastMarkup1}
          {toastMarkup2}
        </Page>
      </Frame>
    );
  }

  toggleToast1 = () => {
    this.setState(({showToast1}) => ({showToast1: !showToast1}));
  };

  toggleToast2 = () => {
    this.setState(({showToast2}) => ({showToast2: !showToast2}));
  };
}
```

### Toast with custom duration

Use to shorten or lengthen the default duration of 5000 miliseconds.

```jsx
class ToastExample extends React.Component {
  state = {
    showToast: false,
  };

  render() {
    const {showToast} = this.state;
    const toastMarkup = showToast ? (
      <Toast
        content="Message sent"
        onDismiss={this.toggleToast}
        duration={4500}
      />
    ) : null;

    return (
      <Frame>
        <Page title="Toast example">
          <Button onClick={this.toggleToast}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    );
  }

  toggleToast = () => {
    this.setState(({showToast}) => ({showToast: !showToast}));
  };
}
```

---

## Related components

- To present a small amount of content or a menu of actions in a non-blocking overlay, [use the popover component](/components/popover)
- To communicate a change or condition that needs the merchant’s attention within the context of a page, [use the banner component](/components/feedback-indicators/banner)
