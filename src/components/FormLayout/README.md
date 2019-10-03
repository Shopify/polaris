---
name: Form layout
category: Forms
platforms:
  - android
  - ios
  - web
keywords:
  - FormLayout
  - Group
  - responsive
  - no grid
  - stack fields
  - vertical
  - vertically
  - arrange fields
  - form spacing
  - field layouts
  - form field layouts
  - field stacking
  - stack fields
  - vertical form stacking
  - stack form fields vertically
  - form layout group
  - field group
  - multiple fields in a row
  - condensed field groups
  - short inputs
  - short input fields
  - short text fields
  - layout forms
  - layout input fields
  - android
  - ios
---

# Form layout

Use form layout to arrange fields within a form using standard spacing. By default it stacks fields vertically but also supports horizontal groups of fields.

---

## Best practices

Forms should:

- Be considerate of merchants’ time and privacy by only asking for information that’s required
- Group related tasks under section titles to provide more context and make the interface easier to scan
- Follow a logical, predictable order—for example, always ask for first name first, and last name second on forms

---

## Content guidelines

### Form section title

Form section titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings).

### Field label

A label is a short description of a field. Labels are not help text, and they shouldn’t be used to provide instruction, but they should be meaningful and clearly indicate what is expected. Labels should be:

- Placed above or beside the form field
- Short and succinct (1–3 words)
- Written in sentence case (the first word capitalized, the rest lowercase)

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

### Help text

Help text provides extra guidance to people filling out a form field. This text is easy for people to ignore, so merchants should not need to depend on it to fill out a form. As with all forms, help text should be succinct and easy to read.

---

## Examples

### Default form layout

Use to stack form fields vertically, which makes them easier to scan and complete.

```jsx
<FormLayout>
  <TextField label="Store name" onChange={() => {}} />
  <TextField type="email" label="Account email" onChange={() => {}} />
</FormLayout>
```

<!-- content-for: android -->

![Default form layout for Android](/public_images/components/FormLayout/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Default form layout for iOS](/public_images/components/FormLayout/ios/default@2x.png)

<!-- /content-for -->

### Field group

Use field groups to arrange multiple fields in a row.

Works best for familiar layouts such as a row of city, state, and zip code fields. Use caution when arranging unrelated fields next to each other as this makes fields easier to miss.

Field groups will wrap automatically on smaller screens.

```jsx
<FormLayout>
  <FormLayout.Group>
    <TextField type="number" label="Minimum order" onChange={() => {}} />
    <TextField type="number" label="Maximum order" onChange={() => {}} />
  </FormLayout.Group>
</FormLayout>
```

<!-- content-for: android -->

![Form layout with field group for Android](/public_images/components/FormLayout/android/field-group@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Form layout with field group for iOS](/public_images/components/FormLayout/ios/field-group@2x.png)

<!-- /content-for -->

### Condensed field group

<!-- example-for: web -->

For very short inputs, the width of the inputs may be reduced in order to fit more fields in the row.

```jsx
<FormLayout>
  <FormLayout.Group condensed>
    <TextField label="Length" onChange={() => {}} />
    <TextField label="Width" onChange={() => {}} />
    <TextField label="Height" onChange={() => {}} />
    <TextField label="Unit" onChange={() => {}} />
  </FormLayout.Group>
</FormLayout>
```

---

## Related components

- To arrange the largest sections of a page, [use the layout component](https://polaris.shopify.com/components/structure/layout)
