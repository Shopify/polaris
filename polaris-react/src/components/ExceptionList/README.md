---
name: Exception list
category: Lists and tables
keywords:
  - exception list
  - exceptions
  - list
  - list exceptions
---

# Exception list

Use exception lists to help merchants notice important, standout information that adds extra context to a task. Exception lists often consist of a title and description. Each item in the list either has a bullet or icon at the front.

---

## Best practices

The exception list component should:

- Be attached to another component
- Inform merchants about extra context that will help them make better decisions
- Only surface noteworthy, actionable content, like a high risk order or out of stock item
- Used sparingly, so that it has more impact and doesn’t add clutter
- Only use an icon if it adds clarity to the content or helps merchants visualize the meaning

<!-- improvement -->

### Opportunity for improvement

Exception lists aren’t clickable. If you have an idea that could make this component better, please [open an issue](https://github.com/shopify/polaris-react/issues).

<!-- end -->

---

## Content guidelines

Exception lists should:

- Highlight an exceptional state that helps merchants make a decision
- Use the appropriate [color](https://polaris.shopify.com/design/colors) to suit the tone of the message
- Have a description (a title is optional)
- Be concise

For error states, exception lists should:

- Either tell merchants how to solve the problem or be attached to an item that lets merchants fix the problem

If placed next to an item in a [resource list](https://polaris.shopify.com/components/lists-and-tables/resource-list), exceptions lists should:

- Make the entire list item clickable because the exception list itself isn’t clickable

<!-- usagelist -->

#### Do

- ![Exception list being used inside a resource list item](/public_images/exception-list/do-exception-list@2x.png)

#### Don’t

- ![Exception list being used in place of a banner](/public_images/exception-list/dont-exception-list@2x.png)

<!-- end -->

---

## Examples

### Exception list with icon

Use icons to add clarity or assist in visualizing the meaning

```jsx
<ExceptionList
  items={[
    {
      icon: NoteMinor,
      description: 'This customer is awesome. Make sure to treat them right!',
    },
  ]}
/>
```

---

## Related components

<!-- remove comment and adjust link when component is built -->

<!-- * To display an error in a card or section, use the [contextual banner]() component -->

- To display an error at the top of a page, or to indicate multiple errors in a form, use the [banner](https://polaris.shopify.com/components/feedback-indicators/banner) component
- Exceptions lists are often used in the [resource list](https://polaris.shopify.com/components/lists-and-tables/resource-list) component to display conditional content

---

## Accessibility

<!-- content-for: android -->

See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility/)

<!-- /content-for -->

<!-- content-for: ios -->

See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

<!-- /content-for -->

<!-- content-for: web -->

Items in an exception list are organized as list items (`<li>`) in an unordered list wrapper (`<ul>`), so they’re conveyed as a group of related elements to assistive technology users.

Icons displayed with exception list items are meant to visually reinforce the adjacent information, not to convey information on their own. They are skipped by screen readers using `aria-hidden="true"`.

<!-- /content-for -->
