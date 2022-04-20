---
name: Design/Typography
slug: typography
icon: IconTitlesAndText
keywords:
  - type styles
  - font sizes
  - fonts
---

# Typography

Shopify admin provides a constrained, purposeful set of typographic styles. These styles map to functional roles so you know when to use what.

By tying typographic styles to specific functions in the interface, we create a clear visual pattern for merchants to follow while they interact with our product.

---

## Principles

### Style with purpose

A disciplined consistency with how you size and style type makes the whole admin more intuitive to use. Merchants who learn how to navigate one experience can apply that same knowledge to each new experience they come across.

### Stay flexible

To make things accessible to audiences with different eyesight constraints, across different browsers, and different mobile devices, make sure to design in a way that works no matter what font size the merchant opts to use.

---

## Font sizes

<!-- keywords: type scales, typographic scales, display x-large, display large, display regular, display medium, display small, font size -->

We use the typographic scale to communicate visual hierarchy in text.

<!-- typescale -->

<!-- end -->

---

## Formatting

<!-- keywords: strong, bold, subdued, greyed-out, grayed-out, grey text, gray text, font weight, text weight -->

Along with the typographic scale, sometimes additional formatting is necessary to illuminate the distinction between smaller-scale relationships. Different formatting styles can be implemented using the text style component.

<!-- centeredcontent -->

![Diagram presenting text that is left aligned](/public_images/design/type/type-left-align@2x.png)

### Left aligned

By default, text is left aligned. Exceptions to this rule include text in tables, and the centered text we use in empty states.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting text that is emphasised by being bold](/public_images/design/type/type-strong@2x.png)

### Strong

Use this style sparingly and only where strong emphasis is required. In interfaces, strong should be seldom used to enhance visual hierarchy.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting text that is underlined](/public_images/design/type/type-underline@2x.png)

### Underline

Underline styles are exclusively for text links. Don’t use underline for things like adding emphasis to text within body copy.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting text that is subdued in a lighter gray color](/public_images/design/type/type-subdued@2x.png)

### Subdued

The subdued style lets you de-emphasize content, and you can use it across all font sizes. Mostly it should be used in contrast to other un-subdued text, vs. on its own. However you can use Subdued with standalone text that’s non-actionable or less important.

<!-- end -->

---

## Display styles

<!-- showcasecontent -->

### PageHeading

PageHeading is reserved for the title of a screen.

![An interface showing the title of a page before its contents](/public_images/design/type/type-pageheading@2x.png)

<!-- end -->

<!-- showcasecontent -->

### Display

Display is for titling various interface elements, such as empty states and modals.

![An empty state and a modal with large display headings](/public_images/design/type/type-display@2x.png)

<!-- end -->

<!-- showcasecontent -->

### Heading

Heading should always be used for titles of top-level sections of a screen. If the sections of a screen are represented by cards, each card’s title should use the Heading style.

![Two interface cards with headings](/public_images/design/type/type-heading@2x.png)

<!-- end -->

<!-- showcasecontent -->

### Subheading

If a top-level section of a screen has subsections, use the Subheading style for titling those subsections. Subheading should never appear as the first element in a card. Only use with titles (vs. sections of content).

![An interface card titled with a large heading text size followed by a smaller subheading](/public_images/design/type/type-subheading@2x.png)

<!-- end -->

<!-- showcasecontent -->

### Caption

Caption is for providing details in places where content is compact and space is tight, like when it comes to data visualization.

![A line chart with small, caption-sized labels](/public_images/design/type/type-caption@2x.png)

<!-- end -->

---

## Font stack

<!-- keywords: font-family, webfont, system font -->

We use a font stack that adapts to the operating system it runs on, like macOS, iOS, Windows, Android or Linux distributions.

<!-- showcasecontent -->

![A diagram showing a selection of default iOS, Mac, Windows, Android and Linux fonts](/public_images/design/type/type-fontstack@2x.png)

<!-- end -->

- Apple devices will display [San Francisco](https://developer.apple.com/fonts/)
- Android devices will display
  [Roboto](https://material.io/guidelines/resources/roboto-noto-fonts.html)
- Devices running Windows will display
  [Segoe UI](https://en.wikipedia.org/wiki/Segoe#Segoe_UI)
- Machines running Linux will display the default sans-serif font for any
  running distribution

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

---

## Mobile considerations

<!-- keywords: mobile typography, native typography, mobile fonts, iOS typography, Android typography, mobile type scale, native type scale -->

<!-- usagelist -->

#### Do

- Refer to the platform’s native font scales when designing experiences for native apps
- Refer to the small-screen scale when designing experiences for mobile browsers
- Use the platform-specific component library

#### Do

- Use the native font scale
- Keep in mind that all UI elements containing text will be affected
- Explore additional content height, width, truncation, and line wraps

<!-- end -->

### Mobile type scale

Both iOS and Android native apps use a different type scale than the web and mobile web. This native typescale is loaded into the app and is slightly different across these platforms. It uses the small-screen scale as a starting point, then uses additional styles to support the specifics of each platform.

By using the native type scale as you design for mobile native, it guarantees that the experience and its UI components will be crafted at the correct screen aspect ratio, ensuring a more accessible experience.

### Mobile variable font sizes

Variable font sizes are one of the most common accessibility features enabled on mobile. They let your audience increase or decrease the size of text on their mobile device. Once set, all apps installed will use the new values and the font sizes will be adjusted accordingly.

Variable font sizes usually have a major impact on the UI components, since the content width and height can be shifted by up to 20%. This is particularly important for the information located near the screen fold. For more information, read the [foundational principles for mobile design](/foundations/mobile).

<div class="NextPage">
Next<br/>
<a href="/design/illustrations#navigation">Illustrations</a>
</div>
