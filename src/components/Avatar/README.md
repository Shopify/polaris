---
name: Avatar
category: Images and icons
platforms:
  - android
  - ios
  - web
keywords:
  - photo
  - profile
  - picture
  - thumbnail
  - default face
  - face picture
  - customer avatar
  - customer face
  - customer picture
  - business face
  - business picture
  - customer avatar
  - business avatar
  - customer thumbnail
  - business thumbnail
  - ios
  - android
---

# Avatar

Avatars are used to show a thumbnail representation of an individual or
business in the interface.

---

## Best practices

Avatars should be one of 3 sizes:

- Small (32 x 32 px): use when the medium size is too big for the layout, or when the avatar has less importance
- Medium (40 x 40 px): use as the default size
- Large (60 x 60 px): use when an avatar is a focal point (e.g. on a single customer card)

---

## Content guidelines

Any time you use an image to communicate a concept on Shopify, it’s important to use descriptive [alt text](/content/alternative-text). Doing this is important for [accessibility](/patterns-and-guides/accessibility) because it allows screen readers to describe what’s in the image to people who may not be able to see it.

For avatars, we recommend using a format that describes what will show in the
image:

- `alt="Person’s name"` if the avatar represents a person
- `alt="Business’s name"` if the avatar represents a business
- `alt=""` if the name of the person/business appears next to the avatar as text

---

## Examples

### Default avatar

Use to present an avatar for a merchant, customer, or business.

```jsx
<Avatar customer name="Farrah" />
```

<!-- content-for: android -->

![Default avatar](components/Avatar/android/default.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Default avatar](components/Avatar/ios/default.png)

<!-- /content-for -->

---

## Related components

- To show a thumbnail for an object rather than a person or business, [use the thumbnail component](/components/images-and-icons/thumbnail)
