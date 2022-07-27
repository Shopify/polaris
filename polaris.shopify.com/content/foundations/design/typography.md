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

[Figma styles](http://www.google.com) | [Tokens](http://www.google.com) | [Components](http://www.google.com)

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

![A diagram showing a selection of default iOS, Mac, Windows, Android and Linux fonts](/images/foundations/design/typography/type-fontstack@2x.png)

<!-- end -->

- Apple devices will display [San Francisco](https://devimages-cdn.apple.com/design/resources/download/SF-Pro.dmg)
- Android devices will display [Roboto](https://fonts.google.com/specimen/Roboto)
- Devices running Windows will display [Segoe UI](https://developer.microsoft.com/en-us/fabric#/resources)
- Machines running Linux will display the default sans-serif font for any running distribution [Ubuntu](https://design.ubuntu.com/font/)
- [SF Mono](https://devimages-cdn.apple.com/design/resources/download/SF-Mono.dmg) is a monospace typeface that is part of the San Francisco typeface family. SF Mono is not a system font but is used to differentiate information.

### Font stack

| Token                | Properties                                                                                                                                          |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| --p-font-family-sans | font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; |
| --p-font-family-mono | font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace !default;`                                                    |

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

Our type styles are grouped into three categories: **Display**, **Heading**, and **Body**. Each category has a default set of variants along with a set of options to allow for flexibility and a wide range of applications within the user interface. They use one scale, so they can be applied to any screen size.

### Heading

Heading styles are used to create various levels of hierarchy on the page.

[Examples]

The larger sizes, Heading 2xl -Heading 4xl, are typically used for numerals and key moments in the merchant’s journey.

As the largest text on the screen, use these styles sparingly within a single page. These styles should draw the merchant’s attention to important key pieces of information.

### Body

Body styles are used within components and blocks of text.

<!-- end -->

## Designing with type

When designing with type, it’s important to ensure legibility. Good readability and hierarchy can also be achieved through spacing, font weight, and color.

### Foundational typesetting

Foundational typesetting
Typesetting can be used to add visual clarity to type elements. By understanding it, you’ll be able to better apply type to the UI.

### Bounding box

The bounding box is vertically center-aligned to set the vertical height of the text. At all times, the bounding box needs to be used. Refer to [individual text style] for specified heights.

[Example]

The bounding box which is the same as the line height is defined for each text style and/or UIs.

### Padding

Appropriate padding between different texts and/or UIs needs to be applied. Refer to the spacing tokens to see the range of spacing options.

[Example]

The padding between different texts and/or UIs ensures legibility.

Align to the baseline
The baseline is the imaginary line that letters rest on.

[Example]

Text is horizontally aligned to the baseline.

There are situations where it makes sense to have multiple text sizes on a single line to establish hierarchy of elements. For example, the header of a page may have a large title with smaller actions to the right. Aligning to the text’s baseline instead of center gives a more harmonious look.

[Example]

### Line length

Line length is the width of the content. For longer body text, the recommended line length is between 50 to 75 characters.

For shorter lines of text, the ideal length is 25 to 50 characters.

[Example]

The optimal line length for body text is 50-75 characters.

Ways to improve hierarchy
By using spacing, font weight, and color, you can further improve readability and hierarchy in type.

### Spacing

We can help merchants navigate the UI by grouping related information together. This is done by providing intentional spacing.

[Example]

Appropriate spacing helps to group different content

### Font weights

Default text styles have font weights specified. For example, the font weight of the body text styles are regular by default. However, when necessary, different font weights may be used.

[Example]

Adjusting font weights can help with readability, comprehension, and overall cohesiveness.

### Font color

Color and contrast can improve hierarchy and legibility.

[Example]

Adjusting font color can help achieve better content hierarchy.
