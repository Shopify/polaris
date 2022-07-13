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

**Make text legible.** Adjust the font weight, size, and color as needed to emphasize important information. This will help merchants understand hierarchy and patterns as they navigate the UI.

**Make text adaptable to user needs and preferences.** Be mindful of those who use alternative input peripherals or screen readers. Design in a way that works for a wide range of audiences, browsers, and mobile devices.

**Create strong information and visual hierarchy.** Blurb

---

## Fonts

### Typefaces

The Shopify admin utilizes system fonts, which allow for optimized performance. This design decision takes advantage of retina screens, dynamic kerning, font-weights, and improved readability.

The typefaces listed below are the most used system-fonts in the admin UI. Be aware that typographic implementations may vary between browser settings and operating systems.

_add image_

- Apple devices will display [San Francisco](https://devimages-cdn.apple.com/design/resources/download/SF-Pro.dmg)
- Android devices will display [Roboto](https://fonts.google.com/specimen/Roboto)
- Devices running Windows will display [Segoe UI](https://developer.microsoft.com/en-us/fabric#/resources)
- Machines running Linux will display the default sans-serif font for any running distribution [Ubuntu](https://design.ubuntu.com/font/)
- [SF Mono](https://devimages-cdn.apple.com/design/resources/download/SF-Mono.dmg) is a monospace typeface that is part of the San Francisco typeface family. SF Mono is not a system font but is used to differentiate information.

## Formatting

<!-- keywords: strong, bold, subdued, greyed-out, grayed-out, grey text, gray text, font weight, text weight -->

Along with the typographic scale, sometimes additional formatting is necessary to illuminate the distinction between smaller-scale relationships. Different formatting styles can be implemented using the text style component.

<!-- centeredcontent -->

![Diagram presenting text that is left aligned](/images/foundations/design/typography/type-left-align@2x.png)

### Left aligned

By default, text is left aligned. Exceptions to this rule include text in tables, and the centered text we use in empty states.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting text that is emphasised by being bold](/images/foundations/design/typography/type-strong@2x.png)

### Strong

Use this style sparingly and only where strong emphasis is required. In interfaces, strong should be seldom used to enhance visual hierarchy.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting text that is underlined](/images/foundations/design/typography/type-underline@2x.png)

### Underline

Underline styles are exclusively for text links. Don’t use underline for things like adding emphasis to text within body copy.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting text that is subdued in a lighter gray color](/images/foundations/design/typography/type-subdued@2x.png)

### Subdued

The subdued style lets you de-emphasize content, and you can use it across all font sizes. Mostly it should be used in contrast to other un-subdued text, vs. on its own. However you can use Subdued with standalone text that’s non-actionable or less important.

<!-- end -->

---

## Display styles

<!-- showcasecontent -->

### PageHeading

PageHeading is reserved for the title of a screen.

![An interface showing the title of a page before its contents](/images/foundations/design/typography/type-pageheading@2x.png)

<!-- end -->

<!-- showcasecontent -->

### Display

Display is for titling various interface elements, such as empty states and modals.

![An empty state and a modal with large display headings](/images/foundations/design/typography/type-display@2x.png)

<!-- end -->

<!-- showcasecontent -->

### Heading

Heading should always be used for titles of top-level sections of a screen. If the sections of a screen are represented by cards, each card’s title should use the Heading style.

![Two interface cards with headings](/images/foundations/design/typography/type-heading@2x.png)

<!-- end -->

<!-- showcasecontent -->

### Subheading

If a top-level section of a screen has subsections, use the Subheading style for titling those subsections. Subheading should never appear as the first element in a card. Only use with titles (vs. sections of content).

![An interface card titled with a large heading text size followed by a smaller subheading](/images/foundations/design/typography/type-subheading@2x.png)

<!-- end -->

<!-- showcasecontent -->

### Caption

Caption is for providing details in places where content is compact and space is tight, like when it comes to data visualization.

![A line chart with small, caption-sized labels](/images/foundations/design/typography/type-caption@2x.png)

<!-- end -->

---

## Font stack

<!-- keywords: font-family, webfont, system font -->

We use a font stack that adapts to the operating system it runs on, like macOS, iOS, Windows, Android or Linux distributions.

<!-- showcasecontent -->

![A diagram showing a selection of default iOS, Mac, Windows, Android and Linux fonts](/images/foundations/design/typography/type-fontstack@2x.png)

<!-- end -->

- Apple devices will display [San Francisco](https://developer.apple.com/fonts/)
- Android devices will display
  [Roboto](https://material.io/guidelines/resources/roboto-noto-fonts.html)
- Devices running Windows will display
  [Segoe UI](https://en.wikipedia.org/wiki/Segoe#Segoe_UI)
- Machines running Linux will display the default sans-serif font for any
  running distribution

This font-stack makes sure all browsers can load platform-specific fonts:

| Token                    | Properties   |
| ------------------------ | ------------ |
| --p-font-fontfamily-sans | font-family: |
| --p-font-fontfamily-sans | font-family: |

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

- Refer to the platform’s native font scales when designing experiences for native apps
- Refer to the small-screen scale when designing experiences for mobile browsers
- Use the platform-specific component library

#### Do

- Use the native font scale
- Keep in mind that all UI elements containing text will be affected
- Explore additional content height, width, truncation, and line wraps

<!-- end -->
