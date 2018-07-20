---
name: App provider
category: Structure
keywords:
  - app
  - provider
  - appprovider
  - internationalization
  - i18n
  - localization
  - context
  - translate
  - translation
  - application wrapper
  - wrapper
  - EASDK
  - embedded app SDK
  - SDK
---

# App provider

App provider is a required component that enables sharing global settings throughout the hierarchy of your application.

---

## Best practices

The app provider component is required to use Polaris. Without it, the components in your application will not function correctly. You must wrap the root (the top) of your application in the app provider component. We’ve created [several examples to show how that’s done](https://github.com/Shopify/polaris/blob/master/examples/README.md).

---

## Examples

### Default

AppProvider works by default without any additional options passed to it.

```jsx
<AppProvider>
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
</AppProvider>
```

### With i18n object

With an `i18n` object, the app provider component will override default English translations.

```jsx
<AppProvider
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
</AppProvider>
```

### With linkComponent

With a `linkComponent`, the app provider component will override the links used in other components. For example you may want to use the `Link` component provided by `react-router` throughout your application instead of the default `a` tag.

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
      <AppProvider linkComponent={CustomLinkComponent}>
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
      </AppProvider>
    );
  }
}
```

---

## Initializing the EASDK

You must store your API key and the `shopOrigin` provided by the Shopify API somewhere on the page so you can use them to initialize your application.

```jsx
// We are accessing the apiKey and shopOrigin
// from content in script tags.
const shopOrigin = document.querySelector('#ShopOrigin').textContent;
const apiKey = document.querySelector('#APIKey').textContent;

ReactDOM.render(
  <AppProvider shopOrigin={shopOrigin} apiKey={apiKey}>
    <ResourcePicker
      open
      products
      onSelection={(resources) => console.log('Selected resources ', resources)}
    />
  </AppProvider>,
);
```

---

## Testing components

You must include Polaris context in your tests when you use Polaris components.

To make this easier for you, we've provided:

- a `createPolarisContext()` function to create the Polaris context for you
- a `polarisContextTypes` variable that contains all the necessary context types
- a fully-working [example app with Jest and Enzyme](https://github.com/Shopify/polaris/tree/master/examples/create-react-app) you can reference

---

## Additional methods

Some functionality of the underlying EASDK API, like displaying a flash message from within your embedded app, can be accessed through [various methods](https://github.com/Shopify/polaris/blob/master/documentation/Embedded%20apps.md#access-to-further-easdk-apis). Please note, these methods are scheduled to be removed in a future release of updated Polaris components and the current implementation will be deprecated. At that time, new methods will be provided and the old methods will become backwards compatible.
