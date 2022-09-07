---
title: Exception list
description: Use exception lists to help merchants notice important, standout information that adds extra context to a task. Exception lists often consist of a title and description. Each item in the list either has a bullet or icon at the front.
category: Lists and tables
keywords:
  - exception list
  - exceptions
  - list
  - list exceptions
examples:
  - fileName: exception-list-default.tsx
    title: Default
    description: Use icons to add clarity or assist in visualizing the meaning
---

## Best practices

The exception list component should:

- Be attached to another component
- Inform merchants about extra context that will help them make better decisions
- Only surface noteworthy, actionable content, like a high risk order or out of stock item
- Used sparingly, so that it has more impact and doesn’t add clutter
- Only use an icon if it adds clarity to the content or helps merchants visualize the meaning

---

## Content guidelines

Exception lists should:

- Highlight an exceptional state that helps merchants make a decision
- Use the appropriate [color](https://polaris.shopify.com/design/colors) to suit the tone of the message
- Have a description (a title is optional)
- Be concise

Punctuation for exception lists should follow [list item guidelines](https://polaris.shopify.com/components/list). Standalone exceptions (a single sentence or sentence fragment) do not need end punctuation. Titles are optional and can be used as a header or as an inline label introducing the description.

If the title (header) and the description are on separate lines, use a line break.

> - **List item title**  
> Full sentence list item description.

If the list item title is inline and a sentence fragment, use a colon before the description.

> - **Sentence fragment list item title:** Full sentence list item description.

If the list item title is inline and a full sentence, use a period before the description.

> - **Full sentence list item title.** Full sentence list item description.

For error states, exception lists should:

- Either tell merchants how to solve the problem or be attached to an item that lets merchants fix the problem

If placed next to an item in a [resource list](https://polaris.shopify.com/components/resource-list), exceptions lists should:

- Make the entire list item clickable because the exception list itself isn’t clickable

<!-- dodont -->

#### Do

- ![Exception list being used inside a resource list item](/images/components/exception-list/do-exception-list@2x.png)

#### Don’t

- ![Exception list being used in place of a banner](/images/components/exception-list/dont-exception-list@2x.png)

<!-- end -->

---

## Related components

- To display an error at the top of a page, or to indicate multiple errors in a form, use the [banner](https://polaris.shopify.com/components/banner) component
- Exceptions lists are often used in the [resource list](https://polaris.shopify.com/components/resource-list) component to display conditional content

---

## Accessibility

Items in an exception list are organized as list items (`<li>`) in an unordered list wrapper (`<ul>`), so they’re conveyed as a group of related elements to assistive technology users.

Icons displayed with exception list items are meant to visually reinforce the adjacent information, not to convey information on their own. They are skipped by screen readers using `aria-hidden="true"`.
