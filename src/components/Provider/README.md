---
name: Provider
category: Behavior
keywords:
  - provider
  - internationalization
  - i18n
  - localization
  - context
  - translate
  - translation
---

# Provider

Provider is a required component that enables the internationalization of strings in Polaris components by sharing global settings throughout the hierarchy of your application.

---

## Best practices

Provider is required. Without it, your application will break. You must wrap the root (the top) of your application in the provider component. We've created [several examples to show how that's done](https://github.com/Shopify/polaris/blob/master/examples/README.md).

| Prop  | Type   | Description | Default |
| ----- | ------ | ----------- | ------- |
| i18n | any | A locale object or array of locale objects that overrides default translations | English |

## Examples

### Default

Provider works by default without an `i18n` object, defaulting to English.

```jsx
<Provider>
  <Page>
    <Card>
      <ResourceList />
    </Card>
  </Page>
</Provider>
```

### With i18n object

With an `i18n` object, the provider component will override default English translations.

```jsx
<Provider i18n={ {
  'ResourceList': {
    showing: '{itemsCount} {resource} affichés',
    defaultItemPlural: 'articles',
    defaultItemSingular: 'article'
  }
} }>
  <Page>
    <Card>
      <ResourceList />
    </Card>
  </Page>
</Provider>
```
