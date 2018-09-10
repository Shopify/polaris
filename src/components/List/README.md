---
name: List
category: Lists and tables
platforms:
  - android
  - ios
  - web
keywords:
  - bulleted lists
  - numbered lists
  - icon lists
  - list items
  - text lists
  - text-only lists
  - ios
  - android
---

# List

Lists display a set of related text-only content. Each list item begins with a bullet or a number.

---

## Best practices

Lists should:

- Break up chunks of related content to make the information easier for
  merchants to scan
- Be phrased consistently (e.g. try to start each item with a noun or a
  verb and be consistent with each item)
- Not be used for lists where the entire item represents an action

---

## Content guidelines

### List items

Every item in a list should:

- Start with a capital letter
- Not use commas or semicolons at the end of each line

<!-- usagelist -->

#### Do

- Red
- Yellow
- Blue

#### Don’t

- Red;
- Yellow;
- Blue.

<!-- end -->

- Be written in sentence case

<!-- usagelist -->

#### Do

- Item one
- Item two
- Item three

#### Don’t

- Item One
- Item Two
- Item Three

<!-- end -->

---

## Examples

### Bulleted list

Use for a text-only list of related items that don’t need to be in a specific order and don’t require an icon or other indicator.

```jsx
<List type="bullet">
  <List.Item>Yellow shirt</List.Item>
  <List.Item>Red shirt</List.Item>
  <List.Item>Green shirt</List.Item>
</List>
```

<!-- content-for: android -->

![Bulleted list on Android](components/List/android/bullets.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Bulleted list on iOS](components/List/ios/bullets.png)

<!-- /content-for -->

### Numbered list

Use for a text-only list of related items when an inherent order, priority, or sequence needs to be communicated.

```jsx
<List type="number">
  <List.Item>First item</List.Item>
  <List.Item>Second item</List.Item>
  <List.Item>Third Item</List.Item>
</List>
```

<!-- content-for: android -->

![Numbered list on Android](components/List/android/numbered.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Numbered list on iOS](components/List/ios/numbered.png)

<!-- /content-for -->

---

## Related components

- To create a list of checkboxes or radio buttons, [use the choice list component](/components/forms/choice-list)
- To present a collection of objects of the same type such as customers, products, or orders, [use the resource list component](/components/lists-and-tables/resource-list)
- When text labels for each item are useful for describing the content, [use the Description List component](/components/lists-and-tables/description-list)
