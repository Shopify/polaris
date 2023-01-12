---
title: Component lifecycle
description: Polaris components move through a series of stages throughout their lifecycle. Within each stage, a component must meet a set of requirements.
keywords:
  - components
  - component lifecycle
  - component stages
  - alpha
  - beta
  - stable
  - deprecated
order: 11
---

**Feedback and suggestions.** Have a question, feedback or suggestion? You can create an issue during any stage of a component’s lifecycle.

---

## Alpha

Ready for exploratory usage, with breaking changes expected. We may decide not to move forward with the component and it could be deprecated without warning.

**Requirements**

- Uses Polaris tokens with no references to any hard-coded static values.
- Designed with responsiveness in mind and can adapt across breakpoints.
- Meets most accessibility requirements.
- In progress documentation exists that includes the list of props with some examples.
- Documentation includes examples in Storybook.
- The component has 100% test coverage.

**What to expect**

- Usage is being evaluated, and may not progress to Beta.
- Components could be changed completely, or removed from the system.
- Feedback is highly recommended and encouraged. Create an issue.

---

## Beta

Ready for wider usage, encouraged for most cases. Breaking changes are possible.

**Requirements**

- Used multiple times in production (Shopify admin).
- Meets all accessibility requirements for our use cases.
- Usage guidelines and documentation covers common use cases.
- Has been reviewed and tested in production by designers and developers.
- Figma components available in the Polaris Components file.

**What to expect**

- Work is being done to move to Stable.

## Stable

Ready for full adoption, with long-term support expected.

**Requirements**

- The API is stable, with no breaking changes until the next major release (if necessary).
- Usability testing and feedback has been gathered on UX and DX.
- Documentation exists for component props, variants, accessibility guidelines, and usage.

---

## Deprecated

The component will likely be removed in the next major release and usage is discouraged.

**Requirements**

- Documentation exists for the deprecation and includes any alternative components.
- The component includes deprecation warnings when used.
- Manual and automated migration documentation exists.
