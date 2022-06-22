---
name: Stepper
category: Forms
platforms:
  - android
  - ios
keywords:
  - stepper
  - counter
  - numbered field
  - numberpicker
  - picker
  - android
  - ios
examples:
  # - fileName: stepper-default.tsx
  #   title: Default stepper
  #   description: >-
  #     The stepper has two buttons, a minus and a plus button. It’s possible to
  #     tap into the text field as well.
  # - fileName: stepper-disabled.tsx
  #   title: Disabled stepper
  #   description: >-
  #     If you reach the bottom or top value, the appropriate button becomes
  #     disabled.
---

# Stepper

Use stepper to increase or decrease a value in a counter field.

---

## Best practices

- Make it clear what you’re increasing and decreasing the value of by placing it in close context of the value it’s changing.
- Eliminate merchants’ need to remember values by using a numerical indicator outside of the stepper that shows the maximum value.

---

## Content guidelines

Avoid truncating the value.

<!-- usagelist -->

#### Do

7,820

#### Don’t

78...

<!-- end -->

Avoid abbreviating values (10k, 1m), instead, make the text smaller to fit the space.

<!-- usagelist -->

#### Do

52,834

#### Don’t

52k

<!-- end -->

---

## Related components

- If values need to change dramatically, use [text field with number field](https://polaris.shopify.com/components/forms/text-field)
- If values shouldn’t change or won’t be changing, use [disabled text field](https://polaris.shopify.com/components/forms/text-field)
