---
name: Tag
tags:
  - indicator
  - label
category: Feedback indicators
---

# Tag

Tags represent a set of interactive, merchant-supplied keywords that help label, organize, and categorize objects. Tags can be added or removed from an object by merchants.


**Problem**

Merchants need to be able to add and remove keywords from objects (e.g. products or orders) to organize and categorize them.

**Solution**

Tags are visual indicators of categories that can be changed or removed. They help merchants organize objects in the Shopify interface.

> **Not what you’re looking for?**
>* To show the status of an object, [use the badge component](/components/images-and-icons/badge).

---

## Best Practices

Tags should:

- Be presented close to or within the input control that allows merchants to add and remove tags

---

## Content guidelines

Tags are either automatically generated or are created by merchants. There are no specific content guidelines for creating them.

| Prop | Type | Description |
| ---- | ---- | ----------- |
| children | string | Content to display in the tag |
| onRemove | function() | Callback when tag is removed |

## Examples

### Default tag

Use to represent a list of attributes on an object that can be added or removed.

```jsx
<Tag>Wholesale</Tag>
```
