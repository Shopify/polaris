---
title: Layout
icon: Columns3Major
keywords:
  - layout
  - layout components
  - structure
  - position
  - stack
  - columns
  - bleed
  - card
  - Box
description: Polaris layout components let you quickly build custom layouts without writing CSS code.

---

<!-- inline css styling for html video and images -->
<style>
.space-hero {
  margin: 40px -30px 40px -30px;
}
</style>

---

<div class="space-hero">
  <img src="/images/foundations/design/layout/layout-banner.png" alt="A visual example of a polaris unit">
</div>

---

## What are layout components?

Polaris layout components define the structure and spacing of user interfaces in a fast and composable way. They create consistent layouts across all components and pages of an application. Developers can use these components to quickly create flexible pages and features without worrying about the underlying structure or CSS code.

Each layout component encapsulates CSS styles commonly found in the Shopify admin. Passing different values to the component props will render the respective CSS style. 

You can browse available layout components in the [Layout and structure](/components/layout-and-structure) component section.

---

## Layout components vs writing CSS 

Polaris layout components provide several benefits over writing layout CSS code.

- **Consistency.** Layout components suggest standard layout and spacing, unifying the Shopify admin experience.
Reusability. Create new pages and components with these layout building blocks, and avoid rewriting the same CSS code.
- **Maintainability.** CSS code is abstracted away, simplifying how you update layout and spacing. There’s also reduced risk of errors and breaking styles.
- **Reliability.** Reducing redundant CSS through layout components improves site performance for merchants.
- **Faster development.** Stop writing CSS code from scratch, and focus on the logic and functionality of your application.

## Guiding behaviors

Layout components are intended to solve about 80% of layout use cases. But they won’t solve everything. For unique cases, leverage (Polaris design tokens)[/tokens/colors] to write your own CSS styles. 

When building, keep the following behaviors and limitations in mind.

<div as="SideBySide">

- <span>**Layout components are single purpose, composable, and flexible.** Single-purpose components allow us to separate concerns and predict behavior when the design system changes. A known tradeoff can be extra elements in the markup. <br /><br />Combine these components to build any layout. Their flexibility means different combinations can achieve the same visual result.</span> ![web context bar](/images/foundations/design/layout/single-purpose-composible-flexible@2x.png)
- <span>**Layout components shouldn’t affect anything outside their borders.** They should only impact components rendered inside of them. The exception is the (Bleed)[/components/layout-and-structure/bleed] component.</span> ![web context bar](/images/foundations/design/layout/outside-borders@2x.png)
- <span>**Layout components have a default spacing of 0.** There isn’t a perfect default, so add spacing with intention. For more information, refer to the [Space](/design/space) guide.</span> ![web context bar](/images/foundations/design/layout/default-spacing@2x.png)
- <span>**Layout component behaviors rely on Polaris tokens.** Behaviors like spacing, color, and breakpoints are configured via component prop APIs. Each prop expects a specific value that maps to a [Polaris design token](/tokens/colors).</span> ![web context bar](/images/foundations/design/layout/tokens@2x.png)

</div>

## Designing with layout components
### Where should I start? 
In the Polaris Figma component library, there is a section called “Layout” that displays the base for layout. The Polaris site also has written documentation for layout component. To ensure designs are fully responsive, refer to the layout breakpoints and examples in Figma and the Polaris [spacing documentation](/design/space).

### Considerations as a designer
[Spacing](/design/space) can affect a layout when breakpoints come into play. On smaller screens, consider how elements will be tighter. On medium to large screens, cards will be side by side and have more room. All layout primitives use the breakpoint scale as well as tokens.

## Layout components in action

### Example 1
![](/images/foundations/design/layout/example1.png)

[Polaris Sandbox link](https://polaris.shopify.com/sandbox?code=N4Igxg9gJgpiBcIA8AhCAPABABwIZSgEsA7AcwF4AdEANmoD5LjNMkBBAG2wAtcBhXACcojZi0zAA9ACppmJuPEAVbjEylc2HIIhaAzjAAuezIdWY9eMGoBGRgO4wYzGLjDdM7whyiYSp804eXABlQzcAa0w%2BCABbbAhiZ0MFRXVNTDdrbGNMCABXQQsrElJMWD1CUmZDCAjnE1wTADdcDnyYE25DQ2w9eElJBI4hQj0AOj1uXUIAMwBPcchYyVr64j1JSzdS1MVZSQBfPdYg3jDI9OwqEAAmakxZ-I4OAHVCKDNRRSlZE5YYu1Yhs-CYbPlvIZMPZCGZoiEQupBB9MPliLAimY1NNoJl0ZkwNlcnwEUiUbgesjwYZOv9HhBMeZIECQdgdNg6QdjmJFEhAflgSZmQKNjcAIyzIq4fK1Bh0lhIJQwdBQpo3DkgTCtZG4YiGG6qfClACyUDlPLSLAAmgUiokOCQ1HpaoI1GNiIBMAihumcmHmRnlrEkSpV30trBQMtqzGwI38hEgxHIwAAEgzCAAvRLhDgAEQgxmNJAZh3oSEkkZ6iTDvMk-MFNfEiuVqr06vN4cw%2Bc9UNmDNIRlMEEwrtiEGaaixOCaensDN89lUzHmBQ9rpHrig8yHFnCghSFsUBhepXGdPLIcMjfLZ1C4TAEUbvzpaCwpEIE5MK-yBOsehMtSYLEurbiSiJsj6%2B6EJ0eK%2BFkMA5CYtrlJ0VQ1HUDTyIe9JFM68wOmQmSUoQ1KdOMmAAJKGAA5EhhRARAzpajAgh6BS3hqCM35QssCRJHqnJHCcqAYNOBClCgHAQA%2BFz7jcAAsHZpKgUbVgASjAY4TpgAAKM5zsI5aVtG14VhgYY3lwvACMIohGeZTAgAANCAWKxJ0CAANogFJYBtDA8DOCAAC6Lkwp83B6F5ADsNAABzBYcQA)

### Example 2
![](/images/foundations/design/layout/example2.png)
[Polaris sandbox link](https://polaris.shopify.com/sandbox?code=N4Igxg9gJgpiBcIA8AhCAPABABwIZSgEsA7AcwF4AdEAFmoD5LjNMkBBAG2wAtcBhXACcoOfETJUQABmqZBEAK7FYUNgCMIANxiSAtlAZMWLVBlEESFanRCNmxk5x64AygBdcYANaZSubJI2dg4OSAAqMOhumLgAzpLcAIyymkKEuMRuCTD4lgCyBrZGIQ4ACgpqHISx3DAiHBmkCrikMLHFJUgA9BFRwSWsvdGpgumZkhpQAJ4FspAcEIKSsRVQCnWG9gOYbGBuhNqYJJhutZi6Ql4wbrEntVMA5IdqMDDMYnUnEDHKmJrVhEqMC%2BHQGYAUsTcEF0MEEsQAdKDQj1Im5%2BsinLx3J4vOjWF00Og8aYsHgLBJrLINMJYSgFt5sYIstQiP9YIJNp0%2BBAOApdMRbvM%2BQLyMBqIkAGaCGIKKHUAC%2BeNCAEliFViMC-AFKUUtgNwqjMBKIJkAOowQikbjMkCxGC6QE8wr0ACiZCqNW6QyVIVQ%2BFa9AAIjAJbgFBw3N0UP6YD6TF1VerY0jjEgADIkXF8XhkYGwUPhyNdDPEXEp7rc3n82LEgkYYmElNk8RWWjUFPU9l0iAMjxMySswjs9t6lhqHGkeRKKATCdT5Qjkqd2EAJVyELdUEZNoATIuQsvBGuiBvlJvJHuQKCfaV5LpsNFwZDobDbscVthsIs3J9BDBSIQJq3FCmA1BA2BHMwpwWtK9K4BwmANGQzStCmEKWHcwLppm9AuNw4GEBKUyYAA4jAPI9rg%2Bwmjsn7wt0JZlnqUb1sU3SYvwQhQHYLFEkwIAADQgNBMKxAgADaIBwRwMDwG8IAALpCQA7kOpxifA4kAOwAGwABwKfKQA)

### Example 3
![](/images/foundations/design/layout/example3.png)
[Polaris sanbox link](https://polaris.shopify.com/playroom/index.html?code=N4Igxg9gJgpiBcIA8AFAhgcxgPgDoDsACQpAQQBsAHACzQGUAXNMAa0IzUoF5cQAOXniLESFGmgDCaAE5QhIkUgCS%2BcgEt8MQmnUZ8PEAGdKzGAFoARjAYB3GDHy9CF8hFYU1eg2AcMY0pw5uXgAWQQIFBSQAFRgADwZ5SIVSMAY1ADc0P0IGajVDQlcwbLUIIjUAM0I1BgByQqsNDEIAV0MYKEJKiGlCQwY3Fmaa-AzfXoBPABoI5JFK1vJKtXJ1fBbe2GlDacJe-pg1kcppaFa0wznkpAB6WISkm4AhVoZB-GxU9Kyc4tLyndXu9yk9FLcVOscNcSLcxLQpLIknd4fQmKwhHd0FghCBpiA8jAALYwQwIADaIH%2B5Bg8AcIAAuvibGooHkyfByQB2ABsfGmAEYAAwhIUMgC%2BQA)

