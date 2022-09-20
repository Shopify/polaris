---
title: Typography
description: Typography is a key part of the design system. It helps establish hierarchy and communicate important content by creating clear visual patterns.
keywords:
  - type styles
  - font sizes
  - fonts
icon: TypeMajor
---

<!-- inline css styling for html video and images -->
<style>
.video-wrap {
  border: 1px solid #E1E3E5;
  border-radius: 8px; 
  overflow: hidden;
}

</style>

---

![An illustration of letters constructed from lego blocks](/images/foundations/design/typography/text-featured@2x.png)

[Figma styles](https://www.figma.com/file/JHp1kp7ghGmTHs147CHjDf/Polaris-Styles?node-id=5455%3A50) | [Tokens](https://polaris.shopify.com/tokens/font) | [Components](https://polaris.shopify.com/components)

---

## Principles

![A series of three illustrations representing the principles make it readable, make it adaptable, reinforce the message](/images/foundations/design/typography/text-principles@2x.png)

### 1. Make it readable

Help merchants understand content quickly by considering how to display and apply text within a page.

### 2. Make it adaptable

Design in a way that works for a wide range of audiences, browsers, and mobile devices.

### 3. Reinforce the message

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

### Heading

Heading styles are used to create various levels of hierarchy on the page.

| Variant        | Size (px) | Size (px) | Line-height | Weight   |
| -------------- | --------- | --------- | ----------- | -------- |
| **Heading4xl** | 40        | 2.5       | 48          | bold     |
| **Heading3xl** | 32        | 2         | 40          | semibold |
| **Heading2xl** | 28        | 1.75      | 32          | semibold |
| **HeadingXl**  | 24        | 1.5       | 28          | semibold |
| **HeadingLg**  | 20        | 1.25      | 24          | semibold |
| **HeadingMd**  | 16        | 1         | 24          | semibold |
| **HeadingSm**  | 14        | 0.875     | 20          | semibold |
| **HeadingXs**  | 12        | 0.75      | 16          | bold     |

![An image of the admin interface showing how various heading styles are used.](/images/foundations/design/typography/text-heading-example-02@2x.png)

The larger sizes, HeadingXl -Heading4xl, are typically used for numerals and key moments in the merchant’s journey. As the largest text on the screen, use these styles sparingly within a single page. These styles should draw the merchant’s attention to important key pieces of information.

![An image of the admin interface showing how large heading styles are used.](/images/foundations/design/typography/text-heading-example-01@2x.png)

### Body

Body styles are used within components and blocks of text.

| Variant    | Size (px) | Size (px) | Line-height | Weight  |
| ---------- | --------- | --------- | ----------- | ------- |
| **BodyLg** | 16        | 1         | 20          | regular |
| **BodyMd** | 14        | 0.875     | 20          | regular |
| **BodySm** | 12        | 0.75      | 16          | regular |

![An image of the admin interface showing how body styles are used.](/images/foundations/design/typography/text-body-example-01@2x.png)

### Responsive type

<div class="video-wrap">
  <video width="100%" height="auto" controls autoplay muted loop>
    <source src="/images/foundations/design/typography/text-responsive.mp4" type="video/mp4">
  </video>
</div>

![An image showing how large headings respond at different screen sizes](/images/foundations/design/typography/text-responsive-styles@2x.png)

<!-- end -->

## Essentials for designing with type

When designing with type, we can use a combination of font size, weight, color, and space to ensure a strong hierarchy and scannability of a page. By understanding the fundamentals, you’ll be able to better apply type to the UI.

### Using the bounding box

The bounding box is the vertical height of the text and is defined by the text’s line-height. The value of the line-height is critical to make sure text aligns to the 4px grid. Refer to individual type styles for specified heights.

![An image showing how the bounding box applies to text elements](/images/foundations/design/typography/text-bounding-box@2x.png)

### Using the baseline

The baseline is the imaginary line that letters rest on. Align text horizontally to the baseline for a simple clean look.

![An image showing the baseline and how it applies to text elements](/images/foundations/design/typography/text-align-baseline@2x.png)

There are situations where it makes sense to have multiple text sizes on a single line to establish hierarchy of elements. Aligning to the text’s baseline instead of center gives a more harmonious look.

![An example of aligning text elements to the baseline](/images/foundations/design/typography/text-center-baseline@2x.png)

### Line length

Line length describes the width of the content. For longer body text, the recommended line length is between 40 to 60 characters.

![A diagram showing the ideal line length for text](/images/foundations/design/typography/text-line-length@2x.png)

### Right align tabular numbers

Right align numbers when they're inside a table. This keeps the decimal in the same place and makes numerical data easier to read and compare.

![An image showing right aligning numbers within a table](/images/foundations/design/typography/text-tabular-numbers@2x.png)

### Color

Color can be used to add contrast and reinforce the hierarchy between text.

For example, one way to distinguish between a title and a subtitle is to apply `--p-text-color` to the title, and `--p-text-subdued` to the subtitle. Using a lighter color for secondary provides contrast between the text and helps reinforce hierarchy even when the text is the same size and weight.

![An image showing how you can use color to add hierarchy within text elements](/images/foundations/design/typography/text-color-different@2x.png)

### Weight

Weight is another way to add contrast and communicate the intent and behavior of text in the interface.

Weights are applied intentionally to both heading and body type styles. Heading styles use bolder weights and body styles use regular and medium weights.

HeadingSm uses a bolder weight which allows it to have a visually similar weight as a larger heading style.

![An image of the admin interface showing how different weights are used to create hierarchy.](/images/foundations/design/typography/text-weights@2x.png)

We encourage the use of default type styles, however, different font weights may be applied when necessary.

![A diagram showing a selection of default iOS, Mac, Windows, Android and Linux fonts](/images/foundations/design/typography/text-weight-different@2x.png)

### Space

We can help merchants navigate the UI by grouping related information together. One way to do this is to use space to create relationships between elements on a page.

Ambiguous spacing can cause confusion and make it hard to understand the content.

![An image of showing how to use space to create hierarchy and relationships between text elements](/images/foundations/design/typography/text-spacing-adjustments@2x.png)
