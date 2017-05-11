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

>__Not what you’re looking for?__
>
>* To create navigational actions that aren’t part of a line of text, [use the button component](/components/button).

---

## Best practices

Links should:

- Consist of text that clearly describes either the action that the merchant will take or the location they’ll navigate to.
- Only be used in a sentence. For stand-alone navigational actions, [use the button component](/components/actions/button)

---

## Content guidelines

### Links

Links should:

- Set the expectation of where the merchant will be taken or what action will be performed
- Be consistent with the content they point to. If a navigational link leads to a page called Orders, label the link “orders”.
- Use descriptive text and avoid using generic content such as “click here”

<!-- usageblock -->
#### Do
Learn more about <a>fulfilling orders</a> at the Shopify Help Center

#### Don't
<a>Click here</a> to learn more about fulfilling orders
<!-- end -->

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
<Link url="https://help.shopify.com/manual">fulfilling orders</Link>
```
