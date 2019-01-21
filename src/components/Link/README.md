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
