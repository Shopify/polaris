---
title: Typography
description: Typography is a key part of the design system. It helps establish hierarchy and communicate important content by creating clear visual patterns.
keywords:
  - type styles
  - font sizes
  - fonts
---

[Figma styles](http://www.google.com) | [Tokens](http://www.google.com) | [Components](http://www.google.com)

---

## Principles

### Make it readable

Help merchants understand content quickly by considering how to display and apply text within a page.

### Make it adaptable

Design in a way that works for a wide range of audiences, browsers, and mobile devices.

### Reinforce the message

Use font weight, size, and color to help establish clear hierarchy and guide merchant’s eyes.

---

## Fonts

<!-- keywords: font-family, webfont, system font -->

### Typefaces

The Shopify admin uses system fonts. This means the typeface will change based on the operating system it runs on, like macOS, iOS, Windows, Android or Linux.

![A diagram showing a selection of default iOS, Mac, Windows, Android and Linux fonts](/images/foundations/design/typography/text-typefaces@2x.png)

<!-- end -->

- Apple devices will display [San Francisco](https://devimages-cdn.apple.com/design/resources/download/SF-Pro.dmg)
- Android devices will display [Roboto](https://fonts.google.com/specimen/Roboto)
- Devices running Windows will display [Segoe UI](https://developer.microsoft.com/en-us/fabric#/resources)
- Machines running Linux will display the default sans-serif font for any running distribution [Ubuntu](https://design.ubuntu.com/font/)
- [SF Mono](https://devimages-cdn.apple.com/design/resources/download/SF-Mono.dmg) is a monospace typeface that is part of the San Francisco typeface family. SF Mono is not a system font but is used to differentiate information.

### Font stack

This font-stack makes sure all browsers can load platform-specific fonts.

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

Our type styles are grouped into two categories: **Heading** and **Body**. Each has a default set of variants along with a set of options to allow for flexibility and a wide range of applications within the user interface. They use one scale, so they can be applied to any screen size.

![A diagram showing a selection of default iOS, Mac, Windows, Android and Linux fonts](/images/foundations/design/typography/text-type-styles@2x.png)

### Heading

Heading styles are used to create various levels of hierarchy on the page.

The larger sizes, Heading 2xl -Heading 4xl, are typically used for numerals and key moments in the merchant’s journey. As the largest text on the screen, use these styles sparingly within a single page. These styles should draw the merchant’s attention to important key pieces of information.

### Body

Body styles are used within components and blocks of text.

### Responsive type

<!-- end -->

## Essentials for designing with type

When designing with type, we can use a combination of font size, weight, color, and space to ensure a strong hierarchy and scannability of a page. By understanding the fundamentals, you’ll be able to better apply type to the UI.

### Using the bounding box

The bounding box is the vertical height of the text and is defined by the text’s line-height. The value of the line-height is critical to make sure text aligns to the 4px grid. Refer to individual type styles for specified heights.

![A diagram showing a selection of default iOS, Mac, Windows, Android and Linux fonts](/images/foundations/design/typography/text-bounding-box@2x.png)

The bounding box which is the same as the line height is defined for each text style and/or UIs.

### Using the baseline

The baseline is the imaginary line that letters rest on.

![A diagram showing a selection of default iOS, Mac, Windows, Android and Linux fonts](/images/foundations/design/typography/text-align-baseline@2x.png)

Align text horizontally to the baseline for a simple clean look.

There are situations where it makes sense to have multiple text sizes on a single line to establish hierarchy of elements. Aligning to the text’s baseline instead of center gives a more harmonious look.

![A diagram showing a selection of default iOS, Mac, Windows, Android and Linux fonts](/images/foundations/design/typography/text-center-baseline@2x.png)

### Line length

Line length describes the width of the content. For longer body text, the recommended line length is between 40 to 60 characters.

![A diagram showing a selection of default iOS, Mac, Windows, Android and Linux fonts](/images/foundations/design/typography/text-line-length@2x.png)

### Right align numbers

Right align numbers when they're inside a table. This keeps the decimal in the same place and makes numerical data easier to read and compare.

![A diagram showing a selection of default iOS, Mac, Windows, Android and Linux fonts](/images/foundations/design/typography/text-tabular-numbers@2x.png)

### Weight

Default text styles have font weights specified. For example, the font weight of the body text styles are regular by default. However, when necessary, different font weights may be used.

Adjusting font weights can help with readability, comprehension, and overall cohesiveness.

### Color

Color and contrast can improve hierarchy and legibility.

Adjusting font color can help achieve better content hierarchy.

### Space

We can help merchants navigate the UI by grouping related information together. One way to do this is to use space to create relationships between elements on a page.

Ambiguous spacing can cause confusion and make it hard to understand the content.
