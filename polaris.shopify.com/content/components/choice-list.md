---
name: Choice list
category: Forms
platforms:
  - android
  - ios
  - web
keywords:
  - ChoiceList
  - form
  - input
  - choices
  - select
  - group of radio buttons
  - radio button group
  - group of checkboxes
  - group of check boxes
  - list of choices
  - list of radio buttons
  - list of checkboxes
  - list of check boxes
  - multi-choice list
  - single-choice list
examples:
  - fileName: choice-list-single.tsx
    title: Single choice list
    description: >-
      Allows merchants to select one option from a list.Make sure all options
      are an either/or choice.
  - fileName: choice-list-single-with-error.tsx
    title: Single choice list with error
    description: >-
      Allows for accessible error handling by connecting the error message to
      the field with the error.
  - fileName: choice-list-multi.tsx
    title: Multi-choice list
    description: >-
      Allows merchants to select multiple options from a list.Avoid options that
      are an either/or choice.
  - fileName: >-
      choice-list-single-choice-or-multi-with-children-content-always-rendered.tsx
    title: Single-choice or multi-choice list with children content (always rendered)
    description: >-
      Use when you need merchants to view and/or interact with additional
      content under a choice. The content will always be rendered. Works for
      both single-choice and multi-choice list.
  - fileName: >-
      choice-list-single-choice-or-multi-with-children-content-only-rendered-when-choice-is-selected.tsx
    title: >-
      Single-choice or multi-choice list with children content (only rendered
      when choice is selected)
    description: >-
      Use when you need merchants to view and/or interact with additional
      content under a choice. The content is only rendered when the choice is
      selected. Works for both single-choice and multi-choice list.
---

# Choice list

A choice list lets you create a list of grouped radio buttons or checkboxes.
Use this component if you need to group together a related list of interactive
choices.

---

## Best practices

Choice lists should:

- Include a title that tells merchants what to do or explains the available options
- Label options clearly based on what the option will do
- Avoid mutually exclusive options when allowing multiple selection

---

## Content guidelines

### List titles

List titles should:

- Help merchants understand how the items in the list are grouped together, or
  should explain what kind of choice merchants are making

<!-- usagelist -->

#### Do

Pick a shipping method

#### Don’t

Pick one

<!-- end -->

- Be concise and scannable:
  - Use simple, clear language that can be read at a glance
  - Keep list titles to a single sentence
  - It the title introduces the list, it should end with a colon
  - Should be written in sentence case

<!-- usagelist -->

#### Do

Shipping options

#### Don’t

Shipping Options

<!-- end -->

- Not use colons

<!-- usageblock -->

#### Do

If the customer abandons their checkout, send them an email reminder to complete their order

<p>
  <label><input type="radio" name="foo"> Never</label><br />
  <label><input type="radio" name="foo"> 6 hours later</label><br />
  <label><input type="radio" name="foo"> 24 hours later</label>
</p>

#### Don’t

If the customer abandons their checkout, send them an email reminder to complete their order:

<p>
  <label><input type="radio" name="bar"> Never</label><br />
  <label><input type="radio" name="bar"> 6 hours later</label><br />
  <label><input type="radio" name="bar"> 24 hours later</label>
</p>
<!-- end -->

### List choices

Every item in a choice list should:

- Start with a capital letter

<!-- usageblock -->

#### Do

- Option 1
- Option 2
- Option 3

#### Don’t

- option 1
- option 2
- option 3

<!-- end -->

- Not use commas or semicolons at the end of each line

<!-- usageblock -->

#### Do

- Red
- Yellow
- Blue

#### Don’t

- Red;
- Yellow;
- Blue.

<!-- end -->

- Be written in sentence case (the first word capitalized, the rest lowercase)

<!-- usageblock -->

#### Do

- Item one
- Item two
- Item three

#### Don’t

- Item One
- Item Two
- Item Three

<!-- end -->

### Helper text and descriptions

If your list contains helper text, only the description below the list item should contain punctuation.

---

## Related components

- To present a long list of radio buttons or when space is constrained, [use the select component](https://polaris.shopify.com/components/forms/select)
- To build a group of radio buttons or checkboxes with a custom layout, use the [radio button component](https://polaris.shopify.com/components/forms/radio-button) or [checkbox component](https://polaris.shopify.com/components/forms/checkbox)
- To display a simple, non-interactive list of related content, [use the list component](https://polaris.shopify.com/components/lists-and-tables/list)

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

The choice list component uses the accessibility features of the [checkbox](https://polaris.shopify.com/components/forms/checkbox) and [radio button](https://polaris.shopify.com/components/forms/radio-button) components.

<!-- /content-for -->
