---
title: Design Patterns
description: Whenever possible we strive to establish and reuse the best solutions to merchant situations. Identifying and documenting design patterns is one way to make this possible.
slug: design-patterns
keywords:
  - patterns
  - design patterns
  - guidelines
  - principles
---

A design pattern is a repeatable solution to a common UX problem in a specific merchant situation. Using the right pattern in the right context makes the Shopify admin familiar and easy to use.

---

### Join the conversation!

Do you have ideas or feedback on how we can make these guidelines more empowering and useful? Please share your thoughts in the [GitHub discussion](https://github.com/Shopify/polaris/discussions/6046).

---

## Principles

For patterns to be successful, they need to be contextual, consistent, and unified.

### Contextual
Patterns are always paired with the problem it solves and the situation it appears in. A solution applied in a context it wasn’t designed for is not a pattern.

### Consistent
Patterns are always used in the same way for the same reasons. Merchants need to be able to trust their expectations.

### Unified
Patterns are always informed by and designed together with similar patterns. For example, patterns with similar purpose should complement each other, and patterns with similar functionality should share appearance and behavior.

![A solution box within a problem box within a situation box.](/images/foundations/patterns/design-patterns/situation-problem-solution.png)

Patterns come with a solution, problem, and situation that belong together. Solutions taken out of this context are no longer a pattern.

## Patterns vs. Compositions
Patterns are for merchants and compositions are for builders.

### Pattern purpose
- Design the best possible merchant experience
- Simplify learning the UI
- Improve recognizability and ease of use
- Improve merchants’ admin proficiency

### Composition purpose
- Share as much code as possible
- Speed up build process
- Improve maintainability and reusability
- Ensure build consistency

### How to distinguish
- Patterns solve usability problems that relate to the usage of admin, while compositions solve build problems that relate to the build process
- Patterns ensure consistent product experience, while compositions ensure consistent implementation
- A pattern can be hard coded and still be a pattern, and a composition can be using Polaris primitives and tokens and still not be a pattern
- Patterns are the language we speak with merchants, compositions are the code we share among us
