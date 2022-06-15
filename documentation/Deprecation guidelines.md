# Deprecation guidelines

- Ship backwards compatible changes which include supporting both the old and new API (make sure the full upgrade path is available)
- Support backwards compatibility for at least half of a major release cycle, but never more that 2 major release cycles
  - For example, before or part of 3.5, okay to remove in 4.0. After 3.5, remove in 5.0
  - Large changes consider a full major release cycle. For example, a large change in 3.1 would be removed in 5.0. But a large change in 2.9 would never wait until 5.0 to remove
- Use the `@deprecated` doc tag for props and components ([for example, add above where the component is defined](https://github.com/Shopify/polaris/blob/8e49e4c65fbbf25d40617ba2d0ff0b3747320f17/src/components/Navigation/components/UserMenu/UserMenu.tsx#L27)), state the reason, and upgrade path
- For significant deprecations, add a section to the component documentation with rationale. State the upgrade path and include a link to a new component if applicable
- Call out deprecations in our [changelog](https://github.com/Shopify/polaris/blob/main/.github/CONTRIBUTING.md#changelog)

## Deprecation console message guidelines

Use `warn` for `Deprecation` messages.

```js
console.warn(
  'Deprecation: The `title` property on Tabs has been deprecated. Use `content` instead.',
);
```

Deprecation messages warn developers when component APIs are in the process of being replaced. It’s important to notify developers of [breaking changes](https://github.com/Shopify/polaris/blob/main/.github/CONTRIBUTING.md#breaking-changes) ahead of their release.

## Examples

- [Deprecation of `Navigation.UserMenu`](https://github.com/Shopify/polaris/pull/849).
