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

- Small (32 × 32 px): use when the medium size is too big for the layout, or when the avatar has less importance
- Medium (40 × 40 px): use as the default size
- Large (60 × 60 px): use when an avatar is a focal point, such as on a single customer card

---

## Content guidelines

Any time you use an image to communicate a concept on Shopify, it’s important to use descriptive [alt text](https://polaris.shopify.com/content/alternative-text). Doing this is important for [accessibility](https://polaris.shopify.com/foundations/accessibility) because it allows screen readers to describe what’s in the image to people who may not be able to see it.

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

![Default avatar](/public_images/components/Avatar/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Default avatar](/public_images/components/Avatar/ios/default@2x.png)

<!-- /content-for -->

---

## Related components

- To show a thumbnail for an object rather than a person or business, [use the thumbnail component](https://polaris.shopify.com/components/images-and-icons/thumbnail)

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

### Structure

The avatar component uses a generated scalable vector graphics (SVG) file, which can cause challenges for merchants that use assistive technologies. To create a standard experience, the `<img>` is hidden from assistive technologies by using an empty `alt` attribute, and replaced with a `<span>` that has `role=”img”`.

### Labeling

The avatar component represents content, and should have a text equivalent for merchants using assistive technologies. By default, the value of the `name` prop is used for the alternative text. If different text would be more accurate, use the `accessibilityLabel` prop to replace the value provided by `name`.

<!-- /content-for -->
