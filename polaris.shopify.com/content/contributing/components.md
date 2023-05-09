---
title: Contributing to Polaris React
navTitle: Components
description: Anyone is welcome to contribute to Polaris React components. There are several types of component contributions, but they typically fall under three categories; bug fix, enhancement, or new pattern.
keywords:
  - components
  - contributing to polaris react
  - how to add a prop
  - how to add a prop type
  - how to add a new component
  - bug fix
  - ux improvement
  - improve component
  - improve ux
  - improve accessibility
  - open source
order: 1
---

Bug fixes can be as simple as removing a typo, or as complex as refactoring a component to address a performance or accessibility issue. Enhancements usually add to or update the props of an existing component to extend its functionality or presentation. New patterns can be contributed by simply adding a new example to an existing component’s documentation, or by adding new components or utilities. Often component contributions are a mix of these.

Start planning your contribution as early as possible to account for the scope in your timeline. To get help with the strategy for your contribution early on, start a [discussion](https://github.com/Shopify/polaris/discussions/new) with the Polaris community. If you have a smaller question, reach out in #polaris if you work at Shopify, or the [Shopify Partners Slack](http://shopifypartners.slack.com) if you’re an open source contributor. Once you’ve decided on the best way to solve the problem, submit a [feature proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) or [bug report](https://github.com/Shopify/polaris/issues/new?assignees=&labels=%F0%9F%90%9BBug&template=ISSUE.md) issue. Then contribute the change by shipping a pull request.

Often the changes you make to a component’s code impact the [documentation](/contributing/documentation) and [Figma UI Kit](/contributing/figma-ui-kit). If you work at Shopify, component contributions should be a team effort across disciplines. If you’re an open source contributor, we’ll work with you to update the Figma UI Kit once you [create an issue](https://github.com/Shopify/polaris/issues/new/choose) or open a pull request in the `Shopify/polaris` repo.

## Update props

### Considerations

There are many ways to make a Polaris component more flexible. Updating or adding props is the most common way to add flexibility to the way a component looks or works. Sometimes refactoring the component is [a better path](#add-or-improve-a-component).

Components should be performant, accessible, and maintainable. When contributing a new prop or updating the types of an existing prop, ask yourself how your change might:

- Be backwards compatible
- Increase or maintain performance
- Improve or maintain accessibility
- Address a pain point in the merchant experience
- Reduce complexity of the source code

If a component isn’t flexible enough to meet your project’s requirements, or you’re unsure whether a component is right for your use case, submit an [issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) or open a pull request outlining the problem and the approach you’re thinking about. We’re happy to collaborate to find a solution.

### How to contribute

To add or update a prop:

1. Explore and align on whether to add a new prop or update the types of an existing prop
2. Submit or assign yourself to an existing [feature proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md)
3. Add your change to the props interface
4. Include or update the description comment
5. Update the `@default` value if relevant in the props interface and in the props deconstruction at the start of the component’s definition
6. Add tests to cover the changes
7. Add examples to the component’s documentation
8. Commit your changes and open a pull request

---

## Fix a bug

### Considerations

Bug fixes are high impact contributions that ensure we deliver a reliable, crafted experience to merchants. Whether you’re a seasoned contributor or looking to make your first pull request, there’s a bug report open for every level of experience.

If you’re just getting started with contributing to Polaris React, look for issues that are:

- Labeled as a [good first issue](https://github.com/Shopify/polaris/issues?q=is%3Aopen+is%3Aissue+label%3A%22Good+first+issue%22)
- Not yet assigned to someone
- Haven’t been updated in two or more weeks

### How to contribute

1. Submit or assign yourself to a [bug report](https://github.com/Shopify/polaris/issues/new?assignees=&labels=%F0%9F%90%9BBug&template=ISSUE.md).
2. Assess the time and difficulty of finding and fixing the problem code.
3. If you discover that fixing the bug is too complex or will take longer than you’re able to commit, that’s okay! Your findings will help the next developer move the needle on shipping a fix.
   <br /> - Update the issue with a comment detailing your findings. Describe the problem code and share permalinks to the lines involved.
   <br /> - If you have a potential fix locally, commit and push your changes and open a draft pull request that links to the bug report.
   <br /> - Add or update the issue’s labels to indicate level of difficulty.
   <br /> - Unassign yourself from the issue.
4. If after investigating you arrive at a solution to the issue:
   <br /> - Update the issue so everyone knows a fix is on the way.
   <br /> - Commit your changes and open a pull request

---

## Add or improve a component

### Considerations

From perceived performance and accessibility enhancements, to the evolution of our design language, contributing UX improvements to Polaris components empowers teams to make sweeping changes effectively with minimal technical debt upstream.

When exploring the potential for improving the look, feel, and or experience of a component:

- Prioritize accessibility
- Check [W3C](https://www.w3.org/WAI/ARIA/apg/patterns/) for examples of the pattern the component implements
- Consider whether the existing component could be replaced entirely if it were broken up into smaller components

### Case study

In the years since Polaris launched in 2017, we’ve learned a lot from the Shopify and design system communities. As the system’s matured, we’ve found that many of the components should evolve toward [composition over configuration](https://maecapozzi.com/blog/composition-vs-configuration/). Many props is a signal that a component is solving too many problems or is too opinionated. When that’s the case, there’s an opportunity to refactor the component or build a new component to better meet merchant needs.

For example, `Autocomplete` implements [the combobox with list pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/). When the Deliver team looked into fixing bugs in the component, they decided it would benefit from being broken down into two new components. They contributed `Combobox` and `Listbox` and refactored `Autocomplete` to use them. This reduced complexity and made `Autocomplete` easier to maintain.

The Deliver team partnered with the Polaris team to improve the UX of tag autocomplete inputs in a follow-up project. To accomplish this, we refactored `Combobox` and `Listbox` to support [the combobox with both list and inline autocomplete pattern](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-both.html) with automatic selection. Every `Autocomplete` in the Shopify Admin benefited from those improvements without any code changes needed upstream in the app.

### How to contribute

1. Submit or assign yourself to an existing [feature proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) or [new component proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=&template=NEW_COMPONENT.md)
2. Prototype and iterate on your proposal, testing with merchants as you iterate if possible
3. Commit your changes and open a pull request
