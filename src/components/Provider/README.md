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

Provider is required. Without it, the components in your application will not function correctly. You must wrap the root (the top) of your application in the provider component. We’ve created [several examples to show how that's done](https://github.com/Shopify/polaris/blob/v2/examples/README.md).

## Examples

### Default

Provider works by default without any additional options passed to it.

```jsx
<Provider>
  <Page>
    <Card>
      <ResourceList
        showHeader
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
              <h3>
                <TextStyle variation="strong">{name}</TextStyle>
              </h3>
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
<Provider
  i18n={{
    Polaris: {
      ResourceList: {
        showing: '{itemsCount} {resource} affichés',
        defaultItemPlural: 'articles',
        defaultItemSingular: 'article',
      },
    },
  }}
>
  <Page>
    <Card>
      <ResourceList
        showHeader
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
              <h3>
                <TextStyle variation="strong">{name}</TextStyle>
              </h3>
              <div>{location}</div>
            </ResourceList.Item>
          );
        }}
      />
    </Card>
  </Page>
</Provider>
```

### With linkComponent

With a `linkComponent`, the provider component will override the links used in other components. For example you may want to use the `Link` component provided by `react-router` throughout your application instead of the default `a` tag.

```jsx
class ProviderLinkExample extends React.Component {
  render() {
    const CustomLinkComponent = ({children, url, ...rest}) => {
      return (
        <a
          href={url}
          onClick={() => console.log('Custom link clicked')}
          {...rest}
        >
          {children}
        </a>
      );
    };

    return (
      <Provider linkComponent={CustomLinkComponent}>
        <Page
          breadcrumbs={[{content: 'Products', url: '#'}]}
          title="Jar With Lock-Lid"
          primaryAction={{content: 'Save', disabled: true}}
          secondaryActions={[
            {content: 'Duplicate', url: '#'},
            {content: 'View on your store', url: '#'},
          ]}
        >
          <p>Page content</p>
        </Page>
      </Provider>
    );
  }
}
```
