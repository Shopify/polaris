---
name: AppIcon
category: Images and icons
platforms:
  - android
  - ios
  - web
keywords:
  - photo
  - picture
  - image
  - small app icon
  - medium app icon
  - large app icon
  - image preview
  - android
  - ios
---

# AppIcon

Use AppIcons as a visual anchor and identifier for an app logo. They should be used along with text to provide context.

---

## Best practices

On web, app icons should:

- Be one of 3 sizes:
  - Small (40 × 40 px): use when the medium size is too large for the layout, or when the app icon has less importance.
  - Medium (60 × 60 px): use as the default size.
  - Large (80 × 80 px): use when an app icon is a major focal point. Avoid this size in lists of like items.

On Android and iOS, app icons should:

- Be one of 2 sizes:
  - Default (40 × 40): use as the default size.
  - Large (72 × 72): use when an app icon is a major focal point. Avoid this size in lists of like items.

---

## Content guidelines

---

## Examples

### Default app icon

Use as the default size.

```jsx
<AppIcon
  source="https://cdn.shopify.com/s/files/applications/21d07b9a03ab6e538a053381def7b15d_80x80.png?1533144819"
  alt="facebook ads"
/>
```

<!-- content-for: android -->

<!-- /content-for -->

<!-- content-for: ios -->

<!-- /content-for -->

### Small app icon

<!-- example-for: web -->

Use when the default size is too large for the layout, or when the app icon has less importance.

```jsx
<AppIcon
  source="https://cdn.shopify.com/s/files/applications/21d07b9a03ab6e538a053381def7b15d_80x80.png?1533144819"
  size="small"
  alt="Black choker necklace"
/>
```

### Large app icon

Use when a app icon is a major focal point. Avoid this size in lists of like items.

```jsx
<AppIcon
  source="https://cdn.shopify.com/s/files/applications/21d07b9a03ab6e538a053381def7b15d_80x80.png?1533144819"
  size="large"
  alt="Black choker necklace"
/>
```

<!-- content-for: android -->

<!-- /content-for -->

<!-- content-for: ios -->

<!-- /content-for -->

---

## Related components

- To present a thumbnail representation of an individual or business in the interface, [use the avatar component](/components/images-and-icons/avatar)
