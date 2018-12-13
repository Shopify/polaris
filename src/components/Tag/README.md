---
name: Tag
category: Forms
platforms:
  - android
  - ios
  - web
keywords:
  - indicator
  - label
  - label objects
  - organize objects
  - categorize objects
  - categories
  - keywords
---

# Tag

Tags represent a set of interactive, merchant-supplied keywords that help label, organize, and categorize objects. Tags can be added or removed from an object by merchants.

---

## Best practices

Tags should:

- Be presented close to or within the input control that allows merchants to add and remove tags

---

## Content guidelines

Tags are either automatically generated or are created by merchants. There are no specific content guidelines for creating them.

---

## Examples

### Default tag

Use to allow merchants to add attributes to, and remove attributes from, an object.

```jsx
<Tag>Wholesale</Tag>
```

<!-- content-for: android -->

![Tag for Android](/public_images/components/Tag/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Tag for iOS](/public_images/components/Tag/ios/default@2x.png)

<!-- /content-for -->

---

## Related components

- To show the status of an object, [use the badge component](/components/images-and-icons/badge)
- To add and remove tags, [use the text field component](/components/forms/text-field)
