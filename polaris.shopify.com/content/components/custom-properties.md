---
name: CustomProperties
category: Structure
keywords:
  - theme
  - custom properties
  - color scheme
  - light mode
  - dark mode
examples:
  - fileName: custom-properties-rendered-by-the-app-provider.tsx
    title: Rendered by the app provider
    description: The app provider component renders a CustomProperties component with the default color scheme.
  - fileName: custom-properties-with-a-color-scheme-rendered-by-the-app-provider.tsx
    title: With a color scheme rendered by the app provider
    description: A color scheme can be passed to the app provider to determine what color scheme is globally applied to the application.
  - fileName: custom-properties-with-a-different-color-scheme-nested-within-an-app-provider.tsx
    title: With a different color scheme nested within an app provider
    description: Custom properties can be nested within the custom properties rendered by the app provider in order to override the color scheme at a local level.
---

# Custom Properties

Use the custom properties component to share global theme settings throughout the hierarchy of your application. Custom properties is included by default as a child of the [app provider component](https://polaris.shopify.com/components/app-provider) but can be used independently to apply a base color scheme to its children.

---

## Consuming custom properties colors in a component

The CustomProperties component uses [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) to share color values with components. For a full list of available CSS custom properties, see the [Polaris tokens docs](https://github.com/Shopify/polaris/tree/main/polaris-tokens#readme).

```scss
.Card {
  background-color: var(--p-surface);
  box-shadow: var(--p-shadow-card);
  border-radius: var(--p-border-radius-2);
}
```

---

## Related components

- To share global settings throughout the hierarchy of your application, [use the app provider component](https://polaris.shopify.com/components/app-provider)
