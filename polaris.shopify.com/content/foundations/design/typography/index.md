---
title: Typography
description: Typography is a key part of the design system. It helps establish hierarchy and communicate important content by creating clear visual patterns.
keywords:
  - type styles
  - font sizes
  - fonts
icon: TypeMajor
---

# Typography

Typography is a key part of the design system. It helps establish hierarchy and communicate important content by creating clear visual patterns.

---

![An illustration of letters constructed from lego blocks](/images/foundations/design/typography/text-featured@2x.png)

## Principles

![A series of three illustrations representing the principles make it readable, make it adaptable, reinforce the message](/images/foundations/design/typography/text-principles@2x.png)

### 1. Make it readable

Help merchants understand content quickly by considering how to display and apply text within a page.

### 2. Make it adaptable

Design in a way that works for a wide range of audiences, browsers, and mobile devices.

### 3. Reinforce the message

Use font weight, size, and color to help establish clear hierarchy and guide merchant’s eyes.

---

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

### Right align numbers

Right align numbers when they're inside a table. This keeps the decimal in the same place and makes numerical data easier to read and compare.

![An image showing right aligning numbers within a table](/images/foundations/design/typography/text-tabular-numbers@2x.png)

### Color

Color can be used to add contrast and reinforce the hierarchy between text.

For example, one way to distinguish between a title and a subtitle is to apply `--p-text-color` to the title, and `--p-text-subdued` to the subtitle. Using a lighter color for secondary information provides contrast between the text and helps reinforce hierarchy even when the text is the same size and weight.

![An image showing how you can use color to add hierarchy within text elements](/images/foundations/design/typography/text-color-different@2x.png)

### Space

We can help merchants navigate the UI by grouping related information together. One way to do this is to use space to create relationships between elements on a page.

Ambiguous spacing can cause confusion and make it hard to understand the content.

![An image of showing how to use space to create hierachy and relationships between text elements](/images/foundations/design/typography/text-spacing-adjustments@2x.png)

---

## Fonts

### Typefaces

The Shopify admin utilizes system fonts, which allow for optimized performance. This design decision takes advantage of retina screens, dynamic kerning, font-weights, and improved readability.

## Display styles

### PageHeading

PageHeading is reserved for the title of a screen.

![An interface showing the title of a page before its contents](/images/foundations/design/typography/type-pageheading@2x.png)

### Display

Display is for titling various interface elements, such as empty states and modals.

![An empty state and a modal with large display headings](/images/foundations/design/typography/type-display@2x.png)

### Heading

Heading should always be used for titles of top-level sections of a screen. If the sections of a screen are represented by cards, each card’s title should use the Heading style.

![Two interface cards with headings](/images/foundations/design/typography/type-heading@2x.png)

### Subheading

If a top-level section of a screen has subsections, use the Subheading style for titling those subsections. Subheading should never appear as the first element in a card. Only use with titles (vs. sections of content).

![An interface card titled with a large heading text size followed by a smaller subheading](/images/foundations/design/typography/type-subheading@2x.png)

### Caption

Caption is for providing details in places where content is compact and space is tight, like when it comes to data visualization.

![A line chart with small, caption-sized labels](/images/foundations/design/typography/type-caption@2x.png)

---

## Font stack

We use a font stack that adapts to the operating system it runs on, like macOS, iOS, Windows, Android or Linux distributions.

![A diagram showing a selection of default iOS, Mac, Windows, Android and Linux fonts](/images/foundations/design/typography/type-fontstack@2x.png)

- Apple devices will display [San Francisco](https://developer.apple.com/fonts/)
- Android devices will display
  [Roboto](https://material.io/guidelines/resources/roboto-noto-fonts.html)
- Devices running Windows will display
  [Segoe UI](https://en.wikipedia.org/wiki/Segoe#Segoe_UI)
- # Machines running Linux will display the default sans-serif font for any running distribution
  The typefaces listed below are the most used system-fonts in the admin UI. Be aware that typographic implementations may vary between browser settings and operating systems.

_add image_

- Apple devices will display [San Francisco](https://devimages-cdn.apple.com/design/resources/download/SF-Pro.dmg)
- Android devices will display [Roboto](https://fonts.google.com/specimen/Roboto)
- Devices running Windows will display [Segoe UI](https://developer.microsoft.com/en-us/fabric#/resources)
- Machines running Linux will display the default sans-serif font for any running distribution [Ubuntu](https://design.ubuntu.com/font/)
- [SF Mono](https://devimages-cdn.apple.com/design/resources/download/SF-Mono.dmg) is a monospace typeface that is part of the San Francisco typeface family. SF Mono is not a system font but is used to differentiate information.

### Font stack

This font-stack makes sure all browsers can load platform-specific fonts:

| Token                    | Properties |
| ------------------------ | ---------- |
| --p-font-fontfamily-sans | jlkjl      |
| --p-font-fontfamily-sans | jlkjl      |

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

Our type styles are organized into thoughtful defaults to help create hierarchy in a task-based UI. They include specific weights, line heights, and sizes. Type styles are defined by three roles: Display, Heading, and Body. They use one scale, so they can be applied to any screen size.

### Body

Body styles are used within components and blocks of text.

### Heading

Heading styles are used for page, card, and section titles.

### Display

Display styles are used for numerals and key moments in the merchant’s journey.

## Designing with type
