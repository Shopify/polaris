---
name: Visually hidden
category: Titles and text
keywords:
  - VisuallyHidden
  - screen readers
  - hidden but available for screen readers
  - visually hidden headings
  - hide
  - hidden headings
  - hidden text
  - visually hidden table headers
  - visually hidden headers
  - hidden table headers
  - hidden table headings
  - accessibility
  - a11y
  - assistive technology
examples:
  - fileName: visually-hidden-heading.tsx
    title: Visually hidden heading
    description: >-
      Always provide a heading for a major page section such as a card. In rare
      cases the heading is visually redundant and the meaning is conveyed by
      context. Rather than omit the heading, wrap the heading in the visually
      hidden component.
  - fileName: visually-hidden-table-headers.tsx
    title: Visually hidden table headers
---

# Visually hidden

Use when an element needs to be available to assistive technology (for example, a screen reader) but otherwise hidden.

---

## Best practices

Visually hidden should:

- Not be used if semantic markup can make content understandable to people using assistive technology
- Be used to provide extra context when semantic markup isn’t enough
- Be used on any content that is normally present but is being omitted
- Make sense in context when used with a screen reader

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

The visually hidden component styles text so that it’s not visible, but it is available to assistive technologies like screen readers and other text to speech programs.

The component shouldn’t be used to hide interactive content.

<!-- /content-for -->
