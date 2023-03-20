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
  <img src="/images/foundations/design/space/spacing-polaris-size-units.svg" alt="A visual example of a polaris unit">
</div>

---

## What are layout components?

![Illustrations of blocks representing each principle](/images/foundations/design/space/principles@2x.png)

Polaris layout components define the structure and spacing of user interfaces in a fast and composable way. They create consistent layouts across all components and pages of an application. Developers can use these components to quickly create flexible pages and features without worrying about the underlying structure or CSS code.

Each layout component encapsulates CSS styles commonly found in the Shopify admin. Passing different values to the component props will render the respective CSS style. 

You can browse available layout components in the Layout and structure component section.

---

## Layout components vs writing CSS 

Polaris layout components provide several benefits over writing layout CSS code.

- **Consistency.** Layout components suggest standard layout and spacing, unifying the Shopify admin experience.
Reusability. Create new pages and components with these layout building blocks, and avoid rewriting the same CSS code.
- **Maintainability.** CSS code is abstracted away, simplifying how you update layout and spacing. There’s also reduced risk of errors and breaking styles.
- **Reliability.** Reducing redundant CSS through layout components improves site performance for merchants.
- **Faster development.** Stop writing CSS code from scratch, and focus on the logic and functionality of your application.

## Guiding behaviors

Layout components are intended to solve about 80% of layout use cases. But they won’t solve everything. For unique cases, leverage Polaris design tokens to write your own CSS styles. 

When building, keep the following behaviors and limitations in mind.

**Layout components are single purpose, composable, and flexible.**
Single-purpose components allow us to separate concerns and predict behavior when the design system changes. A known tradeoff can be extra elements in the markup.

Combine these components to build any layout. Their flexibility means different combinations can achieve the same visual result.

**Layout components shouldn’t affect anything outside their borders.**
They should only impact components rendered inside of them. The exception is the Bleed component.

**Layout components have a default spacing of 0.**
There isn’t a perfect default, so add spacing with intention. For more information, refer to the Space guide.

**Layout component behaviors rely on Polaris tokens.**
Behaviors like spacing, color, and breakpoints are configured via component prop APIs. Each prop expects a specific value that maps to a Polaris design token.

## Designing with layout components
tktktk

## Layout components in action

### Ex 1

### Ex 2

### Ex 3
