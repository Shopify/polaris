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

Provider is a required component that enables sharing global settings throughout the hierarchy of your application.

---

## Best practices

Provider is required. Without it, the components in your application will not function correctly. You must wrap the root (the top) of your application in the provider component. We've created [several examples to show how that's done](https://github.com/Shopify/polaris/blob/master/examples/README.md).

## Examples

### Default

Provider works by default without an `i18n` object, defaulting to English.

```jsx
<Provider>
  <Page>
    <Card>
      <ResourceList
        items={[
          {
            id: 341,
            url: 'customers/341',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
          },
          {
            id: 256,
            url: 'customers/256',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
          },
        ]}
        renderItem={(item) => {
          const {id, url, name, location} = item;
          const media = <Avatar customer size="medium" name={name} />;

          return (
            <ResourceList.Item id={id} url={url} media={media}>
              <h3><TextStyle variation="strong">{name}</TextStyle></h3>
              <div>{location}</div>
            </ResourceList.Item>
          );
        }}
      />
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
      <ResourceList
        items={[
          {
            id: 341,
            url: 'customers/341',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
          },
          {
            id: 256,
            url: 'customers/256',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
          },
        ]}
        renderItem={(item) => {
          const {id, url, name, location} = item;
          const media = <Avatar customer size="medium" name={name} />;

          return (
            <ResourceList.Item id={id} url={url} media={media}>
              <h3><TextStyle variation="strong">{name}</TextStyle></h3>
              <div>{location}</div>
            </ResourceList.Item>
          );
        }}
      />
    </Card>
  </Page>
</Provider>
```
