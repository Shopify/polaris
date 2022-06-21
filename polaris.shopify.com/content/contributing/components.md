---
name: Components
keywords:
  - components
  - contributing to polaris react
  - how to add a prop
  - how to add a prop type
  - how to add a new component
  - bug fix
  - ux improvement
  - open source
---

# Contributing to Polaris React

Anyone is welcome to contribute to Polaris React components. There are several types of component contributions, but they typically fall under three categories: fix, enhancement, or new.

A fix could be as simple as removing a typo, or as complex as fixing a long-standing accessibility bug. Enhancements usually extend the functionality, presentation, or user experience of an existing component. New components and utilities are also encouraged.

Start planning your contribution as early as possible to account for the scope in your timeline. To get help with the strategy for your contribution early on, start a [GitHub discussion](https://github.com/Shopify/polaris/discussions/new) with the system community. If you have a smaller question, reach out in [#polaris](https://shopify.slack.com/archives/C4Y8N30KD) if you work at Shopify, or the [Shopify Partners Slack](http://shopifypartners.slack.com) if you're an open source contributor. Once you've decided on the best way to solve the problem, submit a [feature proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) or [bug report](https://github.com/Shopify/polaris/issues/new?assignees=&labels=%F0%9F%90%9BBug&template=ISSUE.md) issue. Then contribute the change by shipping a pull request.

Often the changes you make to a component's code impact the [documentation](/contributing/documentation) and [Figma UI Kit](/contributing/figma-ui-kit). If you work at Shopify, component contributions should be a team effort across disciplines. If you're an open source contributor, we'll work with you to update the Polaris UI Kit once you [create an issue](https://github.com/Shopify/polaris/issues/new/choose) in the `Shopify/polaris` repo.

## Quick start guide

TABLE GOES HERE

## Detailed steps

### Adding or updating props

#### Considerations

There are many ways to make a Polaris component more flexible. Updating or adding props is the most common way to add flexibility to the way a component looks or works. Sometimes refactoring the component is a better path.

Components should be performant, accessible, and maintainable. Too many props is usually a sign that the component is solving too many problems or isn't flexible enough. When that's the case, there's an opportunity to refactor the component or build a new component that addresses the problem you're trying to solve.

Before contributing a new prop or updating the types of an existing prop, consider if the change:

- Is something that was intentionally left out of the component
- Is backwards compatible
- Could decrease performance
- Blocks accessibility
- Patches a bigger issue with the API that could be addressed instead
- Introduces unnecessary complexity to the source code

If a component seems right for your use case, but isn't flexible enough to meet your project's requirements, submit an [issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) outlining the problem and the approach you're thinking about. We're happy to collaborate to find a solution.

#### How to contribute

To add or update a prop:

1. Explore and align on whether to add a new prop or update the types of an existing prop
2. Submit a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) or [new component proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=&template=NEW_COMPONENT.md) and add assign yourself and your collaborators
3. Add your change to the props interface
   - Include or update the description comment
   - Update the `@default` value if relevant in the props interface and in the props deconstruction at the start of the component’s definition
4. Add tests to cover the prop changes
5. Add examples to the component’s documentation
6. Commit your changes and create a pull request

### Fixing a bug

#### Considerations

Bug fixes are high impact contributions that keep the system healthy. Whether you're a seasoned contributor or looking to make your first pull request, there's a bug report open for every level of experience.

If you're just getting started with contributing to Polaris React, look for issues that are:

- Labeled as ["Good first issue"](https://github.com/Shopify/polaris/issues?q=is%3Aopen+is%3Aissue+label%3A%22Good+first+issue%22)
- Not yet assigned to someone
- Haven't been updated in two or more weeks

#### How to contribute

1. Submit or assign yourself to a [bug report issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=%F0%9F%90%9BBug&template=ISSUE.md), then [prepare your development environment](/contributing/shipping-your-contribution#setting-up-your-local-developement-environment).
2. Assess the time and difficulty of finding and fixing the problem code
3. If you discover that fixing the bug is too complex or will take longer than you’re able to commit, that’s okay! Your findings will help the next developer move the needle on shipping a fix.

   - Update the issue with a comment detailing your findings. Describe the problem code and share permalinks to the lines of involved
   - If you have a potential fix locally, commit and push your changes and open a draft pull request that links to the bug report.
   - Add or update the issue’s labels to indicate level of difficulty
   - Unassign yourself from the issue

4. If after investigating you arrive at a solution to the issue:
   - Run `yarn changeset` to add an entry to the change log and release notes
   - Commit and push your changes and create a pull request

### Adding new and improving existing components

#### Considerations

From perceived performance and accessibility enhancements, to the evolution of our design language, contributing UX improvements to Polaris components empowers teams to make sweeping changes effectively with minimal technical debt upstream.

When exploring the potential for improving the look, feel, and or experience of a component:

- Prioritize accessibility
- Check [W3C](https://www.w3.org/WAI/ARIA/apg/patterns/) for examples of the pattern the component implements
- Consider whether the existing component could be replaced entirely if it were broken up into smaller components

For example, `Autocomplete` implements [the combobox with list pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/). When the Deliver team looked into fixing bugs in the component, they decided it would benefit from being broken down into two new components. They contributed `Combobox` and `Listbox` and refactored `Autocomplete` to use them. This reduced complexity and made the `Autocomplete` easier to maintain and extend.

The Deliver team's contribution enabled the Polaris team to improve the UX of tag autocomplete inputs in a follow-up project. To accomplish this, we refactored the `Combobox` and `Listbox` to support [the combobox with both list and inline autocomplete pattern](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-both.html) with automatic selection. Every `Autocomplete` in the Shopify Admin benefited from those improvements without any code changes needed upstream in the app.

#### How to contribute

1. Submit a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) or [new component proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=&template=NEW_COMPONENT.md) and add assign yourself and your collaborators
2. [Prepare your development environment](/contributing/shipping-your-contribution#getting-set-up))
3. Commit and push your changes and [create a pull request](/contributing/shipping-your-contribution#making-your-first-pr)
