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
  - legacy
  - deprecated
order: 1
---

### Feedback and suggestions

Have feedback, a question, or suggestion? [Create an issue](https://github.com/Shopify/polaris/issues/new) during any stage of a component’s lifecycle.

---

## Alpha

The component is a work in progress and ready for exploratory usage, with breaking changes expected. During this stage, we’re being critical about understanding the purpose of the component and what problem it’s trying to solve. If the purpose is unclear, we may decide not to move forward with the component and it could be removed without warning.

### Requirements for alpha

- Has a clear purpose and rationale for why it belongs in Polaris
- Uses Polaris [tokens](https://polaris.shopify.com/tokens) with no references to any hard-coded static values
- Designed with responsiveness in mind and can adapt across [breakpoints](https://polaris.shopify.com/tokens/breakpoints)
- Meets known [accessibility](https://polaris.shopify.com/foundations/accessibility) requirements like: contrast, interactive states, touch target size, etc.
- In progress documentation exists that includes the list of props with some examples
- Documentation includes examples in Storybook
- The component has 100% test coverage

### What to expect during alpha

- Usage is being evaluated, and may not progress to beta. Evaluation includes any necessary research and data that supports why the component belongs in Polaris.
- Components could be changed completely, or removed from the system
- Feedback is highly recommended and encouraged, [Create an issue](https://github.com/Shopify/polaris/issues/new)

---

## Beta

The component moves to beta once there’s a clear understanding of the problem and we’re confident in the solution. The focus of this stage is all about testing in enough environments to make sure the component is bug free.

Ready for wider adoption, encouraged for most cases. Breaking changes are possible in minor version updates.

### Requirements for beta

- Used multiple times in production (Shopify admin)
- Meets all [accessibility](https://polaris.shopify.com/foundations/accessibility) requirements for our use cases
- Usage guidelines and documentation covers common use cases
- Reviewed and tested in production by designers and developers
- Figma components available in the Polaris Components file

### What to expect during beta

- Work is being done to move to Stable
- Manual and automated migration guidance is being worked on

## Stable

The component is bug free and works in most, if not all, environments. It’s ready for full adoption, with long-term support expected.

### Requirements for stable

- The API is stable, with no breaking changes until the next major release (if necessary)
- Usability testing and feedback has been gathered on UX and DX
- Documentation exists for component props, variants, accessibility guidelines, and usage
- Manual and automated migration documentation exists

---

## Legacy

The component will be deprecated and should be avoided.

### Requirements for legacy components

- Documentation exists for the legacy component and includes any alternative components
- The deprecation date has been announced and is at least one month away from the release date of the package that deprecated the component
- Manual and automated migration paths are documented and have been available for at least one month

---

## Deprecated

The component will be removed and should be avoided.

### Requirements for deprecation

- Documentation exists for the deprecation and includes any alternative components
- The component includes deprecation warnings when used
- The removal date has been announced and is at least one month away from the release date of the package that removes the component
- Manual and automated migration paths are documented and have been available for at least one month
