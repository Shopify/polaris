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
  - android
  - ios
---

# Subheading

Subheadings are used for the title of any sub-sections in top-level page sections.

---

## Best practices

Subheadings should:

- Be used to explain and clearly label logical groups in existing sections of a page
- Not be used without a parent heading
- Not be used in tables or list items, such as for the primary content in a [resource list](https://polaris.shopify.com/components/lists-and-tables/resource-list)

---

## Content guidelines

Subheadings should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings).

---

## Examples

### Typographic subheading

Used for the title of any sub-sections in top-level page sections.

```jsx
<Subheading>Accounts</Subheading>
```

<!-- content-for: android -->

![typographic subheading](/public_images/components/Subheading/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![typographic subheading](/public_images/components/Subheading/ios/default@2x.png)

<!-- /content-for -->

---

## Related components

- To break up major sections of a page with a title, [use the heading component](https://polaris.shopify.com/components/titles-and-text/heading)

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

Use the `element` prop to determine the specific HTML element that’s output for the subheading. The component defaults to a level 3 heading (`<h3>`). Use a different value for the `element` prop if a different subheading fits the context better.

Learn more about writing helpful [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings).

<!-- usageblock -->

#### Do

Use subheadings to support the hierarchy and structure of the page.

#### Don’t

- Use subheadings for style alone.
- Use subheadings for major sections of the page.

<!-- end -->

<!-- /content-for -->
