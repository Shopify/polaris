---
name: Subheading
category: Titles and text
platforms:
  - android
  - ios
  - web
keywords:
  - title bar
  - top-level
  - description
  - sub-section titles
  - titles of sub-sections
  - subsection titles
  - titles of subsections
  - card subheadings
  - card section headings
  - headings of card sections
  - card section subheadings
  - android
  - ios
---

# Subheading

Subheadings are used for the title of any sub-sections in top-level page
sections. Generally, sections of a card use subheadings for their titles

---

## Best practices

Subheadings should:

- Be used to explain and clearly label logical groups in existing sections of a page
- Not be used without a parent heading
- Not be used in tables or list items, such as for the primary content in a [resource list](/components/lists-and-tables/resource-list)

---

## Content guidelines

Subheadings should be:

- Informative and descriptive: they should label the type of content grouped
  beneath them
- Concise and scannable:
  - Use simple, clear language that can be read at a glance
  - Keep subheadings to single sentence and avoid using punctuation such as
    periods, commas, or semicolons
  - Write in sentence case (first word capitalized, the rest lowercase)

<!-- usagelist -->

#### Do

- Shipping address

#### Don’t

- The package will be shipped to this address:

<!-- end -->

---

## Examples

### Subheading in a card

Use to structure content in a card.

```jsx
<Subheading>Accounts</Subheading>
```

<!-- content-for: android -->

![Subheading in a card](/public_images/components/Subheading/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Subheading in a card](/public_images/components/Subheading/ios/default@2x.png)

<!-- /content-for -->

---

## Related components

- To learn how a card is structured to group similar concepts and tasks together, [use the card component](/components/structure/card)
- To create a title for a card or top-level page section, [use the heading component](/components/titles-and-text/heading)
