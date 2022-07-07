---
title: Typography
description: Shopify admin provides a constrained, purposeful set of typographic styles. These styles map to functional roles so you know when to use what.
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
