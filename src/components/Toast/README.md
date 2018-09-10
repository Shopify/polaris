---
name: Toast
category: Feedback indicators
platforms:
  - android
  - ios
keywords:
  - toast
  - flash message
  - snackbar
  - notification bar
  - temporary feedback
  - timed feedback
  - ios
  - android
---

# Toast

The toast component is a non-disruptive message that appears at the bottom of the interface to provide quick, at-a-glance feedback on the outcome of an action.

---

## Best practices

- Avoid long texts inside of the toast. Maximum of 2 lines of text.
- Don’t use Cancel / Dismiss action on the toast. It dismisses itself after 2 seconds.
- Don't use more than 1 toast at the same time. Instead, queue them.
- If the toast has an action, keep the action label short. Preferably 1 verb.

---

## Content guidelines

Message should:

- Short and affirmative

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

### Default toast

Use default toast for informative and neutral feedback.

<!-- content-for: android -->

![Default toast with neutral color](components/Toast/android/default.png)

<!-- /content-for -->

<!-- content-for: ios -->

On iOS, icons are available for cases where you want to re-inforce the message.

![Default toast with neutral color](components/Toast/ios/default.png)

<!-- /content-for -->

### Success toast

Use success toast to indicate that something was successful. For example, a product was successfully updated.

<!-- content-for: android -->

![Success toast](components/Toast/android/success.png)

<!-- /content-for -->

<!-- content-for: ios -->

On iOS, icons are available for cases where you want to re-inforce the message.

![Success toast](components/Toast/ios/success.png)

<!-- /content-for -->

### Error

Use error toast to indicate that something failed. For example, your phone is offline and need to reconnect to the internet.

<!-- content-for: android -->

![Error toast](components/Toast/android/error.png)

<!-- /content-for -->

<!-- content-for: ios -->

On iOS, icons are available for cases where you want to re-inforce the message.

![Error toast](components/Toast/ios/error.png)

<!-- /content-for -->

### With action

Use action when you have the ability to act on the message. For example, undo changes, or edit message.

<!-- content-for: android -->

![Default toast with action to undo](components/Toast/android/default-action.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Default toast with action to undo](components/Toast/ios/default-action.png)

<!-- /content-for -->

---

## Related component

- Complex feedback that requires reading and understanding, instead [use Banner](/components/feedback-indicators/banner)
