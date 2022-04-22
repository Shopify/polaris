---
name: New component proposal
about: For proposing new components or changes to existing components
label: New component
---

## Component name

Short intro description (try and keep to two sentences):

> {Component name} are used to {x}. Merchants can use it to {x}.

Other formats for the second sentence:

> It can {x} so merchants can {x}.
> They can {x} to help merchants {x}.

Example:

> Icons are used to {visually communicate core parts of the product and available actions}. They can {act as way-finding tools} to help merchants {more easily understand where they are in the product, and common interaction patterns that are available}.

## Required components

This section is only used if the components is a dependency of or depends on another component. Include a link to the required component and a short explanation of how they interact.

Example:

> The {x} component must be wrapped in the {y} component.

Example:

> The {x} component must be passed to the {y} component.

Otherwise if there are no component dependencies, remove this section.

## Examples

### Example name

Description of example (clearly differentiate examples from each other). Use an image if applicable:

> Use {component name} to let merchants {x}.
>
> ![Aww kitty](https://placeimg.com/300/100/arch/grayscale)

Example for default callout card:

> ### Default callout card
>
> Use to let merchants know about a feature or opportunity where there is a clear, single action they need to take to move to the next step.

Example for callout card with secondary action:

> ### Callout card with secondary action
>
> Use to let merchants know about a feature or opportunity where there are two distinct actions they can take on the information.

## Props

List props and type declarations:

> - **propName** (required or optional): `type` defaults to `value` – description of the prop

Example:

> - **showFoo** (required): `boolean` – Show or hide foo
> - **showBar** (optional): `boolean` defaults to `false` – Show or hide bar
> - **items** (optional): `ItemDescriptor[]` – Collection of items
> - **onClick** (optional): `() => void` – Callback when clicked

### Subtype name

This section is only used if any prop types use a structural subtype, called interfaces in TypeScript. List props and type declarations of the subtype like above:

> - **propName** (required or optional): `type` defaults to `value` – description of the prop

Example:

> ### ItemDescriptor
>
> - **accessibilityLabel** (optional): `string` – Visually hidden text for screen readers
> - **content** (optional): `string` – Content the action displays
> - **disabled** (optional): `string` – Should the action be disabled

## Best practices

The {x} component should:

- This is where you should include design best practices and UX guidelines.

Example:

> The select component should:
>
> - Be used for lists of four or more items
> - List items within the menu alphabetically or some other logical order so mer_chants can easily find the selection they need
> - ...

## Content guidelines

{x} should:

- Content guideline here

| Do example | Don’t example |
| ---------- | ------------- |
| Do this    | Don’t do this |

## Subcomponent name

This section is only used for components with subcomponents. Include a short intro description of the subcomponent purpose and how it relates to the main component.

Example:

> The content of a resource list consists of resource list items. Each item summarizes an individual resource and should link to its show page.
> Because the content of items depends on the type of resource and merchant tasks, resource list items are flexible.

### Subcomponent examples

Description of example (clearly differentiate examples from each other). Use an image if applicable:

> **Subcomponent example name**
>
> Use {component name} to let merchants {x}.
>
> ![Aww kitty](https://placeimg.com/300/100/arch/grayscale)

Example:

> ### Item examples
>
> **Simple resource list item**
>
> A basic resource list item with its details filled in at the point of use.

## Related components

- To {describe how the other component works}, [use the {x} component]

Example:

> - To {learn how to embed a link in a piece of text}, use the {link} component
