---
name: CustomProperties
category: Structure
keywords:
  - theme
  - custom properties
  - color scheme
  - light mode
  - dark mode
omitAppProvider: true
---

# Custom Properties

Use the custom properties component to share global theme settings throughout the hierarchy of your application. Custom properties is included by default as a child of the [app provider component](https://polaris.shopify.com/components/structure/app-provider) but can be used independently to apply a base color scheme to its children.

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

- To share global settings throughout the hierarchy of your application, [use the app provider component](https://polaris.shopify.com/components/structure/app-provider)
