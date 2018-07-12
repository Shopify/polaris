---
name: New component proposal
about: For proposing new components or changes to existing components
---

# Component name

Short intro description (try and keep to two sentences):
> {Component name} are used to {x}. Merchants can use it to {x}.

Other formats for the second sentence:
> It can {x} so merchants can {x}.
> They can {x} to help merchants {x}.

Example:
> Icons are used to {visually communicate core parts of the product and available actions}. They can {act as way-finding tools} to help merchants {more easily understand where they are in the product, and common interaction patterns that are available}.

## Required components

This section is only used for components that depend on another component. Include a link to the required component and a short explanation of how they interact.

Example:
> The {x} component must be wrapped in the {y} component.

Example:
> The {x} component must be passed to the {y} component.

## Examples

Description of example (clearly differentiate examples from each other):
> Use {component name} to let merchants {x}.

Example for default callout card:
> Use to let merchants know about a feature or opportunity where there is a clear, single action they need to take to move to the next step.

Example for Callout card with secondary action:
> Use to let merchants know about a feature or opportunity where there are two distinct actions they can take on the information.

And include an image if applicable:
> ![Aww kitty](http://placekitten.com/300/100)

## Props

Prop descriptions are pulled in from comments written above the prop type decalaration in your component `.tsx` file.

For example:

```tsx
export interface Props {
  /** Show or hide foo */
  showFoo: boolean;
}
```

You can also define a default value for a prop.

For example:

```tsx
export interface Props {
  /**
   * Show or hide foo
   * @default false
   */
  showFoo: boolean;
}
```

## Best practices:

The {x} component should:

- This is where you should include design best practices and UX guidelines.

For example:

> The select component should:
> - Be used for lists of four or more items
> - List items within the menu alphabetically or some other logical order so mer_chants can easily find the selection they need
> - ...

## Content guidelines

{x} should:

- Content guideline here

| Do example | Don’t example |
|------------|---------------|
| Do this | Don’t do this |

## Subcomponent name

This section is only used for components with subcomponents. Include a short intro description of the subcomponent purpose and how it relates to the main component.

Example for the resource list component: The content of a resource list consists of resource list items. Each item summarizes an individual resource and should link to its show page.

Because the content of items depends on the type of resource and merchant tasks, resource list items are flexible.

Include an image if applicable:
> ![Aww kitty](http://placekitten.com/300/100)

### Subcomponent examples

{Example name}
One sentence describing what makes this example unique from the other examples.

Example:
ITEM EXAMPLES
**Simple resource list item**
A basic resource list item with its details filled in at the point of use.

Include an image if applicable:
> ![Aww kitty](http://placekitten.com/300/100)

{Props}

## Related components

- To {describe how the other component works}, [use the {x} component]

Example: To {learn how to embed a link in a piece of text}, use the {link} component
