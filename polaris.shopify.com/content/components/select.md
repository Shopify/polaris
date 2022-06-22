---
name: Select
category: Forms
platforms:
  - android
  - ios
  - web
keywords:
  - on off
  - switch
  - adjuster
  - dropdown menu
  - drop-down menu
  - menu
  - form
  - combobox
  - combo box
  - choice list
  - choicelist
  - list
  - disabled select
  - field label
  - long list of options
  - long option list
  - separate error message
  - ios
  - android
examples:
  - fileName: select-default.tsx
    title: Default select
    description: >-
      Presents a classic dropdown menu or equivalent picker as determined by
      merchants’ browsers.The iOS picker expands in-line. Merchants scroll to
      select the item they want. The Android menu is similar in behavior
      to the web dropdown.
  - fileName: select-with-inline-label.tsx
    title: Select with inline label
    description: >-
      Use only for cases where the select must fit on a single line, such as in
      a toolbar.
  - fileName: select-disabled.tsx
    title: Disabled select
    description: >-
      Use for selections that aren’t currently available. The surrounding
      interface should make it clear why the select box is disabled and how to
      activate it.
  - fileName: select-with-prefix.tsx
    title: Select with prefix
    description: >-
      Renders any React element to the left of individual select options. Does
      not show in the dropdown.
  - fileName: select-with-validation-error.tsx
    title: Select with validation error
    description: >-
      Use to let merchants know if there’s a problem with their selection. For
      selects, a selection is typically invalid only when using a placeholder
      option (“Select”) and no other selection has been made.
  - fileName: select-with-separate-validation-error.tsx
    title: Select with separate validation error
    description: >-
      Use to let merchants know when their select input is invalid in the
      context of a group of form inputs that the select depends on.To render an
      invalid select and its validation error separately:
---

# Select

Select lets merchants choose one option from an options menu. Consider select when you have 4 or more options, to avoid cluttering the interface.

---

## Best practices

The select component should:

- Be used for selecting between 4 or more pre-defined options
- Have a default option selected whenever possible
- Use “Select” as a placeholder option only if there’s no logical default option

---

## Content guidelines

### Select label

Labels should:

- Give a short description (1–3 words) of the requested input.
- Be written in sentence case (the first word capitalized, the rest lowercase).
- Avoid punctuation and articles (“the”, “an”, “a”).
- Be independent sentences. To support [internationalization](https://polaris.shopify.com/foundations/internationalization), they should not act as the first part of a sentence that is finished by the component’s options.
- Be descriptive, not instructional. If the selection needs more explanation, use help text below the field.

<!-- usagelist -->

#### Do

- Email address

#### Don’t

- What is your email address?

<!-- end -->

<!-- usagelist -->

#### Do

- Phone number

#### Don’t

- My phone number is:

<!-- end -->

### Select options

Options should:

- Start with “Select” as a placeholder if there isn’t a default option
- Be listed alphabetically or in another logical order so merchants can easily find the option they need
- Be written in sentence case (the first word capitalized, the rest lowercase) and avoid using commas or semicolons at the end of each option
- Be clearly labelled based on what the option will do

---

## Related components

- To let merchants select one option from a list with less than 4 options, use [the choice list component](https://polaris.shopify.com/components/forms/choice-list)
- To create a select where merchants can make multiple selections, or to allow advanced formatting of option text, use an [option list](https://polaris.shopify.com/components/lists-and-tables/option-list) inside a [popover](https://polaris.shopify.com/components/overlays/popover)
