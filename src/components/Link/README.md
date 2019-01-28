---
name: Link
category: Navigation
keywords:
  - URL
  - linklist
  - link list
  - embed
  - actions
  - pathways
  - deep link
  - text link
  - plain button
  - plain call to action
  - plain cta
  - embeddd action
  - action in text
  - hyperlink
  - secondary actions
  - secondary cta
  - secondary call to action
---

# Link

Links are used to embed actions or pathways to more information in a sentence.

---

## Best practices

Links should:

- Consist of text that clearly describes either the action that merchants will take or the location they’ll navigate to.
- Only be used in a sentence. For stand-alone navigational actions, [use the button component](/components/actions/button).

---

## Content guidelines

### Links

Links should:

- Set the expectation of where merchants will be taken or what action will be performed.
- Be consistent with the content they point to. If a navigational link leads to a page called Orders, label the link “orders”.
- Use descriptive text and avoid using generic content such as “click here”.

<!-- usageblock -->

#### Do

Learn more about <a>fulfilling orders</a> at the Shopify Help Center

#### Don’t

<a>Click here</a> to learn more about fulfilling orders

<!-- end -->

<!-- usagelist -->

#### Do

- Orders

#### Don’t

- To orders section

<!-- end -->

---

## Examples

### Default links

Use for text links in larger spans of text.

```jsx
<Link url="https://help.shopify.com/manual">fulfilling orders</Link>
```

### Monochrome link

Use for text links that are the same color as the surrounding text.

```jsx
<Link monochrome url="https://help.shopify.com/manual">
  fulfilling orders
</Link>
```

---

## Related components

- To create navigational actions that aren’t part of a line of text, [use the button component](/components/actions/button)

---

## Accessibility

<!-- content-for: web -->

### Structure

Use the `url` prop to give the link component a valid `href` value. This allows the element to be identified as a link to assistive technologies and gives it default keyboard support.

#### Submitting data

Merchants generally expect links to navigate, and not to submit data or take action. If you need a component that doesn’t have a URL associated with it, then use the [button component](/components/actions/button) instead.

### Labeling

Give links text that clearly describes their purpose.

To provide consistency and clarity:

- Use the same text for links that navigate to the same content.
- Use different text for links that navigate to different content.

<!-- usageblock -->

#### Do

```jsx
<Link url="https://help.shopify.com/manual">fulfilling orders</Link>
```

#### Don’t

```jsx
<Link>fulfilling orders</Link>
```

#### Don’t

```JSX
<Link url="https://help.shopify.com/manual">fulfilling orders</Link>
```

```JSX
<Link url="https://help.shopify.com/manual">order fulfillment section</Link>
```

<!-- end -->

#### External links

Use the `external` prop to make the link open in a new tab (or window, depending on the merchant’s browser settings). Open a page in a new tab only when opening a page in the same tab might disrupt the merchant’s workflow.

To make the external link functionality clear to all merchants:

- Use the [icon component](/components/images-and-icons/icon) to add the `external` icon to the link
- Use the `accessibilityLabel` on the icon prop to include the warning about opening a new tab in the button text for non-visual screen reader users.

### Keyboard support

Links use browser defaults for keyboard interaction.

- Give links keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- Activate links with the <kbd>enter</kbd>/<kbd>return</kbd> key.

<!-- /content-for -->
