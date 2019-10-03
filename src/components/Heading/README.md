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

Headings are used as the titles of each major section of a page in the interface. For example, [card components](https://polaris.shopify.com/components/card) generally use headings as their title.

---

## Best practices

Headings should:

- Clearly describe the section of interface they refer to
- Highlight the most important concept or piece of information merchants need to know
- Sit at the top of the section of interface they’re referring to

---

## Content guidelines

Headings should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings).

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

- To break up a section with a heading into sub-sections, [use the subheading component](https://polaris.shopify.com/components/subheading)

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

A clear and consistent heading structure helps merchants who have difficulty with reading or language. It also helps screen reader users to navigate the page using keystrokes that are custom to their screen reader.

Use the `element` prop to determine the specific HTML element that’s output for the heading. The component defaults to a level 2 heading (`<h2>`). Use a different value for the `element` prop if a different heading fits the context better.

Learn more about writing helpful [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings).

<!-- usageblock -->

#### Do

Use headings to support the hierarchy and structure of the page.

#### Don’t

Use headings for style alone.

<!-- end -->

<!-- /content-for -->
