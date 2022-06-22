---
name: Display text
category: Titles and text
platforms:
  - android
  - ios
  - web
keywords:
  - DisplayText
  - announcement text
  - greeting text
  - marketing text
  - title text
  - biggest text
  - bigger text
  - big text
  - large text
  - larger text
  - largest text
  - strong text
  - bold text
  - bold statements
  - extra large display text
  - medium and large display text
  - small display text
  - visual story telling
  - visual storytelling
  - visual statements
  - android
  - ios
examples:
  - fileName: display-text-extra-large.tsx
    title: Extra large
    description: >-
      Use this size sparingly and never multiple times on the same
      page.
  - fileName: display-text-large.tsx
    title: Large
    description: >-
      Use for display text that’s more important than the medium size, but less
      important than extra large.
  - fileName: display-text-medium.tsx
    title: Medium
    description: >-
      Use for display text that’s more important than the small size, but less
      important than large.
  - fileName: display-text-small.tsx
    title: Small
    description: >-
      Use for text that would otherwise use body text, but that needs to scale
      with other display text.
---

# Display text

Display styles make a bold visual statement. Use them to create impact when the main goal is visual storytelling. For example, use display text to convince or reassure merchants such as in marketing content or to capture attention during onboarding.

---

## Best practices

- Use when the primary goal of the page is communication rather than
  interaction.
- Use larger display text sizes when a page is focused around a single message.
  In these cases it may be paired with an illustration.
- Use smaller display text to pair with larger text, or alone as part of more
  complex data displays such as dashboards.

---

## Content guidelines

### Display text

Display text should be:

- Benefits-driven and focused on information that is most important to
  merchants
- Concise and scannable:
  - Use simple, clear language that can be read at a glance
  - Keep display text content to a short sentence that’s just a few words in
    length
  - Avoid using punctuation such as periods, commas, or semicolons
  - Avoid using exclamation marks—display text already makes enough of a
    statement without an exclamation mark
  - Write in sentence case

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

Although display text creates an interesting visual experience, it doesn’t replace the semantic structure provided by HTML headings.

By default, the display text component outputs text in an HTML paragraph (`<p>`). If a heading tag is needed for display text, use the `element` prop to set the heading level.

<!-- usageblock -->

#### Do

Use display text to create visual interest along with a meaningful heading structure.

#### Don’t

Use display text in place of standard headings. Use the [heading component](https://polaris.shopify.com/components/titles-and-text/heading) and [subheading component](https://polaris.shopify.com/components/titles-and-text/subheading) to provide structure.

<!-- end -->

<!-- /content-for -->
