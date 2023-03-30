---
title: Layout
icon: TemplateMajor
keywords:
  - layout
  - layout components
  - structure
  - position
  - stack
  - columns
  - bleed
  - card
  - box
  - inline
  - divider
  - responsive
  - spacing
description: Polaris layout components let you quickly build custom layouts without writing CSS code.
---

![](/images/foundations/design/layout/layout-banner.png)

## What are layout components?

Polaris layout components define the structure and spacing of user interfaces in a fast and composable way. They create consistent layouts across all components and pages of an application. Developers can use these components to quickly create flexible pages and features without worrying about the underlying structure or CSS code.

Each layout component encapsulates CSS styles commonly found in the Shopify admin. Passing different values to the component props will render different CSS styles.

You can browse all [layout and structure components](/components/layout-and-structure), as well as view usage guidelines and examples for each component.


## Layout components vs writing CSS

Polaris layout components provide several benefits over writing layout CSS code:

- **Consistency.** Layout components suggest standard layout and spacing, unifying the Shopify admin experience.
- **Reusability.** Create new pages and components with these layout building blocks, and avoid rewriting the same CSS code.
- **Maintainability.** CSS code is abstracted away, simplifying how you update layout and spacing. There’s also reduced risk of errors and breaking styles.
- **Reliability.** Reducing redundant CSS through layout components improves site performance for merchants.
- **Faster development.** Stop writing CSS code from scratch, and focus on the logic and functionality of your application.

## Guiding behaviors

Layout components are intended to solve about 80% of layout use cases. But they won’t solve everything. For unique cases, leverage [Polaris design tokens](/tokens/colors) to write your own CSS styles. When building with layout components, keep the following behaviors and limitations in mind.

<div as="SideBySide">

- <span>**Layout components are single purpose, composable, and flexible.** Single-purpose components allow us to separate concerns and predict behavior when the design system changes. A known tradeoff can be extra elements in the markup. <br /><br />Combine these components to build any layout. Their flexibility means different combinations can achieve the same visual result.</span> ![Card, Columns, Divider, and Inline components assembled together to create admin UI element](/images/foundations/design/layout/single-purpose-composible-flexible@2x.png)
- <span>**Layout components shouldn’t affect anything outside of their borders.** They should only impact components rendered inside of them. The exception is the [Bleed](/components/layout-and-structure/bleed) component.</span> ![Admin card with whitespace between each UI element](/images/foundations/design/layout/outside-borders@2x.png)
- <span>**Layout components have a default spacing of 0.** There isn’t a perfect default, so add spacing with intention. For more information, refer to the [Space](/design/space) guide.</span> ![Admin card with the padding around and between the elements increased](/images/foundations/design/layout/default-spacing@2x.png)
- <span>**Layout component behaviors rely on Polaris tokens.** Behaviors like spacing, color, and breakpoints are configured via component prop APIs. Each prop expects a specific value that maps to a [Polaris design token](/tokens/colors).</span> ![Admin UI element with color and spacing design tokens called out](/images/foundations/design/layout/tokens@2x.png)

</div>

## Breakpoints and spacing

All layout components use the breakpoint scale and tokens. Consequently, consider how spacing can affect a layout, depending on screen size. On smaller screens, elements will be tighter. On medium to large screens, cards will be side by side and have more room.

To ensure designs are responsive, reference the breakpoints and examples in the Polaris [Space](/design/space) documentation.

<video width="100%" height="auto" controls autoplay muted loop>
  <source src="/images/foundations/design/space/breakpoints.mp4" type="video/mp4">
  <p>Browser window resizing with the overlayed column grid dynamically adjusting to the size</p>
</video>

## Layout component examples

The following examples illustrate how the new layout components can be composed together to create admin UI elements. Each example is just one approach to building that particular UI, but many other combinations of layout components can result in the same outcome. To get more comfortable, follow along with the video walkthroughs or try rebuilding these same UIs using a different combination of layout components.

### Example 1

Admin UI card with a horizontal dot button on one side, plus text and a button on the opposite side. [Edit in sandbox.](https://polaris.shopify.com/sandbox?code=N4Igxg9gJgpiBcIA8AhCAPABABwIZSgEsA7AcwF4AdEANmoD5LjNMkBBAG2wAtcBhXACcojZi0zAA9ACppmJuPEAVbjEylc2HIIhaAzjAAuezIdWY9eMGoBGRgO4wYzGLjDdM7whyiYSp804eXABlQzcAa0w%2BCABbbAhiZ0MFRXVNTDdrbGNMCABXQQsrElJMWD1CUmZDCAjnE1wTADdcDnyYE25DQ2w9eElJBI4hQj0AOj1uXUIAMwBPcchYyVr64j1JSzdS1MVZSQBfPdYg3jDI9OwqEAAmakxZ-I4OAHVCKDNRRSlZE5YYu1Yhs-CYbPlvIZMPZCGZoiEQupBB9MPliLAimY1NNoJl0ZkwNlcnwEUiUbgesjwYZOv9HhBMeZIECQdgdNg6QdjmJFEhAflgSZmQKNjcAIyzIq4fK1Bh0lhIJQwdBQpo3DkgTCtZG4YiGG6qfClACyUDlPLSLAAmgUiokOCQ1HpaoI1GNiIBMAihumcmHmRnlrEkSpV30trBQMtqzGwI38hEgxHIwAAEgzCAAvRLhDgAEQgxmNJAZh3oSEkkZ6iTDvMk-MFNfEiuVqr06vN4cw%2Bc9UNmDNIRlMEEwrtiEGaaixOCaensDN89lUzHmBQ9rpHrig8yHFnCghSFsUBhepXGdPLIcMjfLZ1C4TAEUbvzpaCwpEIE5MK-yBOsehMtSYLEurbiSiJsj6%2B6EJ0eK%2BFkMA5CYtrlJ0VQ1HUDTyIe9JFM68wOmQmSUoQ1KdOMmAAJKGAA5EhhRARAzpajAgh6BS3hqCM35QssCRJHqnJHCcqAYNOBClCgHAQA%2BFz7jcAAsHZpKgUbVgASjAY4TpgAAKM5zsI5aVtG14VhgYY3lwvACMIohGeZTAgAANCAWKxJ0CAANogFJYBtDA8DOCAAC6Lkwp83B6F5ADsNAABzBYcQA)

![](/images/foundations/design/layout/example1.png)

<div as="YoutubeVideo" id="D_MsLKbdcGs"></div>

### Example 2

Admin UI card with stacked elements, inline links, and a divider. [Edit in sandbox.](https://polaris.shopify.com/playroom/index.html?code=N4Igxg9gJgpiBcIA8AhCAPABABwIZSgEsA7AcwF4AdEADmoD5LjNMkBBAG2wAtcBhXACcojZi1aceuAMoAXXGADWmUrmxUQAFgZNx4pABUY6WZlwBnDdwBM1TADchhXMVlWY%2BEqQCyUHWL0WAAUAVwAjDkJzbhgoTA4XUhDcUhhzXUCkAHojE1FA1lzTCw1sO0gOCEENc3CoENj-ApY2MFlCexhMEkxZGMwAWyFFGFlzXpiATwByTswwmBhmfFg42QgzYjj7KMIIrvXMMBDzdYGYQXMAOgy9bKL8zJQORbihwVISAEliSOIYDQAViazSQABEOoRYIJMFlHncss9XvD9D8-l1cJFSMQangwDAALQLWQAd0WxBBBSQaJIXVU6mo2hAKKpRTMlmoZRAmAAZhBXAB1GCEUjcNzUcwwAZ7CAcPzM27NFgAUTIkWiiqpOWMsnowDs1AAvpqnvhUvQwTAebgQhxZNkUGaYCz9Fkaf8XSwkAAZEiKeh8XhkLqwa22%2B1ZX3Ef0m7Lu52xpGxQZCT7EeNAuzvNPPCBKVVQTMKgJPDAmvRhBSKUiCCAhLYaStKGt1rbUcviPAELwaJkdlhhKrQ3NKORCcUgIg7aHtksFQfCC4AJU8JwLY8EE9sIH78yHy9X5gLBY0247nv0bJKnMpSswQVrA2wpmOpwg50u3WYtWw2CqsmTQQYE%2BflxkOaIIGwL8JmFGFKjATFdxYBIyGSVJMBOLwYNYKN-WkbhIMIHlJkwABxGBZTzXB2n5TA2F-bJcPoG450ybU8g7B0MBdB0XliFFskkXgxyUR5BK4XgBGEUQuPQUQQAAGhAPopTSBAAG0QHgzEYHgJYQAAXSUkkoT6cwNIAdgANhoAzDSAA)

![](/images/foundations/design/layout/example2.png)

<div as="YoutubeVideo" id="VRRakuy85ss"></div>

### Example 3

Admin UI card with text on one side, and a button on the opposite side. [Edit in sanbox.](https://polaris.shopify.com/playroom/index.html?code=N4Igxg9gJgpiBcIA8AFAhgcxgPgDoDsACQpAQQBsAHACzQGUAXNMAa0IzUoF5cQAOXniLESFGmgDCaAE5QhIkUgCS%2BcgEt8MQmnUZ8PEAGdKzGAFoARjAYB3GDHy9CF8hFYU1eg2AcMY0pw5uXgAWQQIFBSQAFRgADwZ5SIVSMAY1ADc0P0IGajVDQlcwbLUIIjUAM0I1BgByQqsNDEIAV0MYKEJKiGlCQwY3Fmaa-AzfXoBPABoI5JFK1vJKtXJ1fBbe2GlDacJe-pg1kcppaFa0wznkpAB6WISkm4AhVoZB-GxU9Kyc4tLyndXu9yk9FLcVOscNcSLcxLQpLIknd4fQmKwhHd0FghCBpiA8jAALYwQwIADaIH%2B5Bg8AcIAAuvibGooHkyfByQB2ABsfGmAEYAAwhIUMgC%2BQA)

![](/images/foundations/design/layout/example3.png)

<div as="YoutubeVideo" id="D_MsLKbdcGs"></div>
