---
name: Avatar
tags:
  - thumbnail
  - photo
  - picture
  - profile
category: Images and icons
---

# Avatar

Avatars are used to show a thumbnail representation of an individual or
business in the interface.

**Problem**

A merchant may manage multiple businesses on Shopify or may have more than one
person working in a store.

**Solution**

Avatars visually clarify the business or the person being represented at
various locations in the interface.

> **Not what you’re looking for?**
>* To create page-level layout, [use the layout component](/components/structure/layout).

---

## Best practices

Avatars should be one of 3 sizes:

* Small (32 x 32px): use when the medium size is too big for the layout, or when the avatar has less importance
* Medium (40 x 40px): use as the default size
* Large (60 x 60px): use when an avatar is a focal point (e.g. on a single customer card)

---

## Content guidelines

Any time you use an image to communicate a concept on Shopify, it’s important to use descriptive [alt text](/content/alternative-text). Doing this is important for [accessibility](/principles/accessibility) because it allows screen readers to describe what’s in the image to people who may not be able to see it.

For avatars, we recommend using a format that describes what will show in the
image:

* alt="person’s name" if the avatar represents a person
* alt="business’s name" if the avatar represents a business
* alt="" if the name of the person/business appears next to the avatar as text

| Prop | Type | Description |
| ---- | ---- | ----------- |
| size | enum['small', 'medium', 'large'] | Size of avatar |
| name | string | The name of the person |
| initials | string | Initials of person to display |
| customer | boolean | Whether the avatar is for a customer |
| source | string | URL of the avatar image |
| accessibilityLabel | string | Accessible label for the avatar image |

## Examples

### Default avatar

Use to present an avatar for a merchant, customer, or business.

```jsx
<Avatar customer name="Farrah" />
```
