---
name: Toast
category: Feedback indicators
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
  - iframe
  - duration
---

# Toast

The toast component is a non-disruptive message that appears at the bottom of the interface to provide quick, at-a-glance feedback on the outcome of an action.

---

## Required components

The toast component must be wrapped in the [frame](https://polaris.shopify.com/components/frame) component.

---

## Best practices

Toast should:

- Be used for short messages to confirm an action
- Not go over 3 words
- Rarely be used for error messages

When to use:

- For success messages
- Only for non-critical errors that are relevant in the moment and can be explained in 3 words. For example, if there’s an internet connection issue, the toast would say, Internet disconnected.

When not to use:

- Avoid using toast for error messages. Always try to use a banner to prominently inform merchants about persistent errors.

---

## Content guidelines

### Message

Toast messages should be:

- Short and affirmative
- Written in the pattern of: noun + verb

<!-- dodont -->

#### Do

- Product updated
- Collection added
- Customer updated
- Internet disconnected
- Connection timed out

#### Don’t

- No internet connection
- Can’t charge negative tax rates
- Your online store has a maximum of 20 themes. Delete unused themes to add more.
- Your product has been successfully updated
- We were unable to save the customer
- Your Order was Archived Today
- Discount: Saved successfully

<!-- end -->

### Toast with action

Only include an action in toast if the same action is available elsewhere on the page. For example:

- If merchants need to reload a section, offer the call to action [Reload] in the toast. If they miss the toast message, they can also refresh the entire page.
- If merchants delete an image, offer the option to [Undo] the deletion. If they miss it in the toast message, they can still retrieve it from somewhere else.

Action should:

- Keep the action label short, preferably 1 verb.
- Not have actions, like [Cancel], for dismissing toast. The [X] to dismiss is already included in the component.
- Be used with a duration of at least 10,000 milliseconds for accessibility.

<!-- dodont -->

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

### Default

Use to convey general confirmation or actions that aren’t critical. For example, you might show a toast message to inform the merchant that their recent action was successful.

```jsx
function ToastExample() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Message sent" onDismiss={toggleActive} />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Toast example">
          <Button onClick={toggleActive}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}
```

### Multiple messages

Use multiple toast messages to inform the merchant about distinct actions.

```jsx
function MultipleToastExample() {
  const [activeOne, setActiveOne] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);

  const toggleActiveOne = useCallback(
    () => setActiveOne((activeOne) => !activeOne),
    [],
  );

  const toggleActiveTwo = useCallback(
    () => setActiveTwo((activeTwo) => !activeTwo),
    [],
  );

  const toastMarkup1 = activeOne ? (
    <Toast content="Message sent" onDismiss={toggleActiveOne} />
  ) : null;

  const toastMarkup2 = activeTwo ? (
    <Toast content="Image uploaded" onDismiss={toggleActiveTwo} />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Toast example">
          <ButtonGroup segmented>
            <Button onClick={toggleActiveOne}>Show toast 1</Button>
            <Button onClick={toggleActiveTwo}>Show toast 2</Button>
          </ButtonGroup>
          {toastMarkup1}
          {toastMarkup2}
        </Page>
      </Frame>
    </div>
  );
}
```

### With custom duration

Use to shorten or lengthen the default duration of 5000 milliseconds.

```jsx
function ToastWithCustomDurationExample() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Message sent" onDismiss={toggleActive} duration={4500} />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Toast example">
          <Button onClick={toggleActive}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}
```

### With action

Use when a merchant has the ability to act on the message. For example, to undo a change or retry an action.

```jsx
function ToastWithActionExample() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast
      content="Image deleted"
      action={{
        content: 'Undo',
        onAction: () => {},
      }}
      duration={10000}
      onDismiss={toggleActive}
    />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Toast example">
          <Button onClick={toggleActive}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}
```

### Error

Although error toast is still available and used in the system, we discourage its use. Reserve it for errors not caused by merchants, like a connection issue. Error toast should convey what went wrong in plain language and should not go over 3 words. For all other error message types, follow the [error message guidelines](https://polaris.shopify.com/patterns/error-messages).

```jsx
function ErrorToastExample() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Server error" error onDismiss={toggleActive} />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Toast example">
          <Button onClick={toggleActive}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}
```

---

## Related components

- To present a small amount of content or a menu of actions in a non-blocking overlay, [use the popover component](https://polaris.shopify.com/components/popover)
- To communicate a change or condition that needs the merchant’s attention within the context of a page, [use the banner component](https://polaris.shopify.com/components/banner)

---

## Accessibility

The content of the toast component is implemented as an ARIA live region using `aria-live="polite"`. When the toast appears, screen readers should announce the toast text after any other more pressing announcements.

Avoid using toast for critical information that merchants need to act on immediately. Toast might be difficult for merchants with low vision or low dexterity to access because it:

- Disappears automatically
- Can’t be easily accessed with the keyboard
- Might appear outside the proximity of the merchant’s current focus

### Toast with action

Make sure that merchants can also accomplish the action in the toast another way, since the toast action may be difficult to access for some merchants. If the toast action is not available somewhere else on the page, for example a retry action that reloads a section, it should have a fallback action, for example a browser refresh.

Toast with action should persist for at least 10,000 milliseconds to give the merchant enough time to act on it.
