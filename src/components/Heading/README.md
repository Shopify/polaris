---
name: Heading
category: Titles and text
platforms:
  - android
  - ios
  - web
keywords:
  - titles
  - text
  - microcopy
  - conversational
  - typographic
  - card headings
  - card titles
  - section titles
  - section headings
  - heading text
  - heading font
  - android
  - ios
---

# Heading

Headings are used as the titles of each major section of a page in the interface. For example, [card components](/components/card) generally use headings as their title.

---

## Best practices

Headings should:

- Clearly describe the section of interface they refer to
- Highlight the most important concept or piece of information merchants need to know
- Sit at the top of the section of interface they’re referring to

---

## Content guidelines

### Heading

Headings should be:

- Informative and descriptive:
  - They should label the type of content grouped in the interface below
- Concise and scannable:
  - Use simple, clear language that can be read at a glance
  - Keep headings to single sentence and avoid using punctuation such as periods, commas, or semicolons
  - Avoid articles (the, a, an) in [microcopy headings](/content/grammar-and-mechanics#headings-and-subheadings) to keep content short and actionable
  - Write in sentence case (first word capitalized, the rest is lowercase)

Microcopy headings should be easy for merchants to scan and understand instantly.

<!-- usagelist -->

#### Do

- Custom reports

#### Don’t

- These are your custom reports

<!-- end -->

Conversational headings for areas like empty states and home cards are the only cases where you should use articles.

<!-- usagelist -->

#### Do

- Secure your account with two-step authentication

#### Don’t

- Two-step authentication

<!-- end -->

---

## Examples

### Typographic heading

Use for the title of each top-level page section.

```jsx
<Heading>Online store dashboard</Heading>
```

<!-- content-for: android -->

![Typographic heading](/public_images/components/Heading/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Typographic heading](/public_images/components/Heading/ios/default@2x.png)

<!-- /content-for -->

---

## Related components

- To break up a section with a heading into sub-sections, [use the subheading component](/components/subheading)
