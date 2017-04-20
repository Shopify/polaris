---
name: Link
tags:
  - URL
  - linklist
  - link list
  - embed
  - actions
  - pathways
  - deep link

category: Navigation
---

# Link

Links are used to embed actions or pathways to more information in a sentence.

**Problem**

Merchants need to be able to navigate to other sections of Shopify or take actions wherever they are in the interface.

**Solution**

Links provide merchants with a way to navigate or take an action in the context of a string of content.

> **Not what you’re looking for?**
>* To create navigational actions that aren’t part of a line of text, [use the button component](/components/button).

---

## Best practices

Links should:

- Consist of text that clearly describes either the action that the merchant will take or the location they’ll navigate to.
- Only be used in a sentence. For stand-alone navigational actions, [use the button component](/components/actions/button)

---

## Content guidelines

### Links

Links should be:

- Used for secondary or persistent actions to represent lower priority actions than buttons, or persistent actions that a merchant may take at any time (e.g. a persistent Edit link).
- Clearly labeled: merchants should not need to guess where they’ll end up if they click on an action link. Never use “click here” as a link because it doesn’t set expectations about what’s next.

<!-- usageblock -->
#### Do
Learn more about fulfilling orders at the Shopify Help Center.

#### Don't
Click here to learn more about fulfilling orders.
<!-- end -->

- Consistent with navigation content. For example, if a navigational link leads to a page called Orders, label the link Orders.

<!-- usagelist -->
#### Do
Orders

#### Don't
To orders section
<!-- end -->

| Properties | Type | Description |
| ---------- | ---- | ----------- |
| url | string | The url to link to. |
| children | string or React.ReactNode | The content to display inside link |
| external | boolean | Use for a links that open a different site |
| onClick | function() | Callback when a link is clicked |

## Examples

###  Default links

Use for text links in larger spans of text.

```jsx
<Link url="https://shopify.com">Shopify</Link>
```
