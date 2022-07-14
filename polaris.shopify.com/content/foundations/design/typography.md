---
name: Typography
keywords:
  - type styles
  - font sizes
  - fonts
---

# Typography

Typography is a key part of the design system. It helps establish hierarchy and communicate important content by creating clear visual patterns.

---

## Principles

### Make it readable.

Help merchants understand content quickly by considering how to display and apply text within a page.

### Make it adaptable.

Design in a way that works for a wide range of audiences, browsers, and mobile devices.

### Reinforce the message.

Use font weight, size, and color to help establish clear hierarchy and guide merchant’s eyes.

---

## Fonts

<!-- keywords: font-family, webfont, system font -->

### Typefaces

The Shopify admin uses system fonts. This means the typeface will change based on the operating system it runs on, like macOS, iOS, Windows, Android or Linux.

<!-- showcasecontent -->

![A diagram showing a selection of default iOS, Mac, Windows, Android and Linux fonts](/images/foundations/design/typography/type-fontstack@2x.png)

<!-- end -->

- Apple devices will display [San Francisco](https://devimages-cdn.apple.com/design/resources/download/SF-Pro.dmg)
- Android devices will display [Roboto](https://fonts.google.com/specimen/Roboto)
- Devices running Windows will display [Segoe UI](https://developer.microsoft.com/en-us/fabric#/resources)
- Machines running Linux will display the default sans-serif font for any running distribution [Ubuntu](https://design.ubuntu.com/font/)
- [SF Mono](https://devimages-cdn.apple.com/design/resources/download/SF-Mono.dmg) is a monospace typeface that is part of the San Francisco typeface family. SF Mono is not a system font but is used to differentiate information.

### Font stack

| Token                  | Font                                                                                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--p-font-family-sans` | `font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";` |
| `--p-font-family-mono` | `font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace !default;`                                                     |

## Type scale

All font sizes have a ratio of 1.2, known as the major third type scale. This means that each size is multiplied or divided by 1.2 from the previous size, starting with the base size, and rounded to a multiple of 4px.

| Token             | Size (px) | Size (rem) |
| ----------------- | --------- | ---------- |
| --p-font-size-700 | 40        | 2.5        |
| --p-font-size-600 | 32        | 2          |
| --p-font-size-500 | 28        | 1.75       |
| --p-font-size-400 | 24        | 1.5        |
| --p-font-size-300 | 20        | 1.25       |
| --p-font-size-200 | 16        | 1          |
| --p-font-size-100 | 14        | 0.875      |
| --p-font-size-75  | 12        | 0.75       |

## Type styles

<!-- keywords: type styles, font-weight, font-size -->

Our type styles are grouped into three categories: **Display**, **Heading**, and **Body**. Each category has a default set of variants along with a set of options to allow for flexibility and a wide range of applications within the UI. They use one scale, so they can be applied to any screen size.

### Body

Body styles are used within components and blocks of text.

### Heading

Heading styles are used for page, card, and section titles.

### Display

Display styles are used for numerals and key moments in the merchant’s journey.

As the largest text on the screen, use these styles sparingly within a single page. Display styles should draw the merchant’s attention to important key pieces of information.

<!-- end -->
