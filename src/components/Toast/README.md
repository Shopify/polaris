---
name: Toast
category: Feedback indicators
platforms:
  - android
  - ios
  - web
keywords:
  - toast
  - flash message
  - snackbar
  - notification bar
  - temporary feedback
  - timed feedback
  - message
  - overlay
  - popup
  - easdk
  - shopify app bridge
  - iframe
  - embedded app
  - duration
  - ios
  - android
  - web
---

# Toast

The toast component is a non-disruptive message that appears at the bottom of the interface to provide quick, at-a-glance feedback on the outcome of an action.

---

## Required components

The toast component must be wrapped in the [frame](/components/structure/frame) component or used in an embedded application.

---

## Use in an embedded application

Passing an API key to the [app provider component](https://polaris.shopify.com/components/structure/app-provider#section-initializing-the-shopify-app-bridge) causes the toast component to delegate to the [Shopify App Bridge](https://help.shopify.com/en/api/embedded-apps/app-bridge) instead of rendering as it would in a stand-alone application.

Note that when used in an embedded application, the toast component does not support multiple, simultaneous toast messages.

```jsx
class EmbeddedAppToastExample extends React.Component {
  state = {
    showToast: false,
  };

  render() {
    const toastMarkup = this.state.showToast && (
      <Toast
        content="Message sent"
        onDismiss={() => this.setState({showToast: false})}
      />
    );

    return <AppProvider apiKey="YOUR_API_KEY">{toastMarkup}</AppProvider>;
  }
}
```

---

## Best practices

Toast should:

- Be used for short messages to confirm an action. Maximum of 2 lines of text.
- Not be used for actionable links or messages.
- Not be used for error messages.
- Be displayed once at the time. If you need multiple toasts, queue them.

---

## Content guidelines

### Message

Messages should be:

- Short and affirmative
- Written in the pattern of: noun + verb

<!-- usagelist -->

#### Do

- Product updated
- Collection added
- Customer updated
- No internet connection

#### Don’t

- Your product has been successfully updated
- We were unable to save the customer
- Your Order was Archived Today
- Discount: Saved successfully

<!-- end -->

### Action

Action should:

- Keep the action label short. Preferably 1 verb
- Not have actions for dismissing toast

<!-- usagelist -->

#### Do

- Undo
- Change
- Edit
- View
- Retry

#### Don’t

- OK
- Got it
- Cancel product
- Continue to collection
- Dismiss

<!-- end -->

---

## Examples

### Basic toast

<!-- example-for: web -->

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
      <div style={{height: '250px'}}>
        <Frame>
          <Page title="Toast example">
            <Button onClick={this.toggleToast}>Show Toast</Button>
            {toastMarkup}
          </Page>
        </Frame>
      </div>
    );
  }

  toggleToast = () => {
    this.setState(({showToast}) => ({showToast: !showToast}));
  };
}
```

### Multiple toast messages

<!-- example-for: web -->

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
      <Toast content="Image uploaded" onDismiss={this.toggleToast2} />
    ) : null;

    return (
      <div style={{height: '250px'}}>
        <Frame>
          <Page title="Toast example">
            <ButtonGroup segmented>
              <Button onClick={this.toggleToast1}>Show toast 1</Button>
              <Button onClick={this.toggleToast2}>Show toast 2</Button>
            </ButtonGroup>
            {toastMarkup1}
            {toastMarkup2}
          </Page>
        </Frame>
      </div>
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

<!-- example-for: web -->

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
      <div style={{height: '250px'}}>
        <Frame>
          <Page title="Toast example">
            <Button onClick={this.toggleToast}>Show Toast</Button>
            {toastMarkup}
          </Page>
        </Frame>
      </div>
    );
  }

  toggleToast = () => {
    this.setState(({showToast}) => ({showToast: !showToast}));
  };
}
```

### Default toast

<!-- example-for: android, ios -->

Use default toast for informative and neutral feedback.

<!-- content-for: android -->

![Default toast with neutral color](components/Toast/android/default.png)

<!-- /content-for -->

<!-- content-for: ios -->

On iOS, icons are available for cases where you want to re-inforce the message.

![Default toast with neutral color](components/Toast/ios/default.png)

<!-- /content-for -->

### Success toast

<!-- example-for: android, ios -->

Use success toast to indicate that something was successful. For example, a product was successfully updated.

<!-- content-for: android -->

![Success toast](components/Toast/android/success.png)

<!-- /content-for -->

<!-- content-for: ios -->

On iOS, icons are available for cases where you want to re-inforce the message.

![Success toast](components/Toast/ios/success.png)

<!-- /content-for -->

### Error toast

<!-- example-for: android, ios, web -->

Use error toast to indicate that an operation has failed. For example, your phone is offline and need to reconnect to the internet. For all other error message types, follow the [error message guidelines](/patterns/error-messages)

<!-- content-for: web -->

```jsx
class ToastExample extends React.Component {
  state = {
    showToast: false,
  };

  render() {
    const {showToast} = this.state;
    const toastMarkup = showToast ? (
      <Toast content="Server error" error onDismiss={this.toggleToast} />
    ) : null;

    return (
      <div style={{height: '250px'}}>
        <Frame>
          <Page title="Toast example">
            <Button onClick={this.toggleToast}>Show Toast</Button>
            {toastMarkup}
          </Page>
        </Frame>
      </div>
    );
  }

  toggleToast = () => {
    this.setState(({showToast}) => ({showToast: !showToast}));
  };
}
```

<!-- /content-for -->

<!-- content-for: android -->

![Error toast](components/Toast/android/error.png)

<!-- /content-for -->

<!-- content-for: ios -->

On iOS, icons are available for cases where you want to re-inforce the message.

![Error toast](components/Toast/ios/error.png)

<!-- /content-for -->

### With action

<!-- example-for: android, ios -->

Use action when you have the ability to act on the message. For example, undo changes, or edit message.
Keep the action label short, preferably 1 verb action.

<!-- content-for: android -->

![Default toast with action to undo](components/Toast/android/default-action.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Default toast with action to undo](components/Toast/ios/default-action.png)

<!-- /content-for -->

---

## Related component

- To present a small amount of content or a menu of actions in a non-blocking overlay, [use the popover component](/components/popover)
- To communicate a change or condition that needs the merchant’s attention within the context of a page, [use the banner component](/components/feedback-indicators/banner)
