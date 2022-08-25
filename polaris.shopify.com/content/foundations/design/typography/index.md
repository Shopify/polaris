---
title: Typography
description: Typography is a key part of the design system. It helps establish hierarchy and communicate important content by creating clear visual patterns.
keywords:
  - type styles
  - font sizes
  - fonts
icon: TypeMajor
---

By tying typographic styles to specific functions in the interface, we create a clear visual pattern for merchants to follow while they interact with our product.

---

![An illustration of letters constructed from lego blocks](/images/foundations/design/typography/text-featured@2x.png)

## Principles

![A series of three illustrations representing the principles make it readable, make it adaptable, reinforce the message](/images/foundations/design/typography/text-principles@2x.png)

### Make it readable

Help merchants understand content quickly by considering how to display and apply text within a page.

### Make it adaptable

Design in a way that works for a wide range of audiences, browsers, and mobile devices.

### Reinforce the message

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

## Font sizes

We use the typographic scale to communicate visual hierarchy in text.

---

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
- Machines running Linux will display the default sans-serif font for any running distribution

This font-stack makes sure all browsers can load platform-specific fonts:

```
-apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif
```

Add this to your CSS to preload system fonts and set up browsers for legibility:

```css
html {
  /* Load system fonts */
  font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI,
    Roboto, Helvetica Neue, sans-serif;

  /* Make type rendering look crisper */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Deactivate auto-enlargement of small text in Safari */
  text-size-adjust: 100%;

  /* Enable kerning and optional ligatures */
  text-rendering: optimizeLegibility;
}

/**
 * Form elements render using OS defaults,
 * so font-family inheritance must be specifically declared
 */
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
}
```
